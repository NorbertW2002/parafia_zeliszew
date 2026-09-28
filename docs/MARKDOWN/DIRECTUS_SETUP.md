# Directus setup

This document configures the CMS expected by the frontend. The public website is built statically; no Directus token is sent to visitors.

## Common fields

All public collections use `status` (`draft`, `published`, `archived`) and an optional numeric `sort` field. Create a public role with read-only access to items whose status is `published`; media is public only when it is intentionally published.

## Collections

| Collection | Required fields |
| --- | --- |
| `announcements` | `slug`, `title`, `published_at`, `content`, `attachments` (M2M files), `seo_title`, `seo_description`, `status` |
| `events` | `slug`, `title`, `description`, `start_date`, `end_date`, `location`, `featured_image` (file), SEO fields, `status` |
| `mass_intentions` | `date`, `time`, `intention`, `celebrant`, `status` |
| `galleries` | `slug`, `title`, `description`, `published_at`, `images` (M2M files with optional `caption`), SEO fields, `status` |
| `priests` | `name`, `role`, `biography`, `email`, `phone`, `image` (file), `status` |
| `parish_groups` | `name`, `description`, `meeting_schedule`, `contact_person`, `image` (file), `status` |
| `homepage` | `introduction` plus optional relations to featured announcements, events, and galleries |

Use unique slugs for public detail collections. Editors need create, update, and publish rights; contributors can create and update drafts only; administrators retain configuration and user-management rights.

## Media and publishing

Require descriptive filenames and fill the Directus file title or description with meaningful alternative text. Limit uploads to web-appropriate images and document formats. Reject executable files.

Create a Directus Flow that calls the Cloudflare Pages deploy hook after a public item is published, updated, or archived. This is necessary because the frontend fetches Directus only at build time.

## Sakramenty — edycja i dostęp

Strona `/sakramenty` obsługuje kolekcję `sacraments`. Każdy z siedmiu sakramentów ma jeden rekord, identyfikowany przez unikalny `slug`. Kolejność jest stała, zgodna z treścią w `src/content/pages/sakramenty.md`.

### Dodanie kolekcji

Plik `directus/sacraments.collection.json` jest gotowym body żądania **POST /collections**, zgodnym z [Collections API](https://docs.directus.io/reference/system/collections). Administrator może wysłać go jednorazowo do własnej instancji Directusa. Nie jest to snapshot do `schema apply`; nie zastępuje istniejącego modelu. Nie stosuj starych snapshotów `schema.yaml` ani `schema_fixed.yaml` po dodaniu tej kolekcji bez sprawdzenia diffu. Po zmianie wykonaj nowy snapshot swojej instancji.

Alternatywnie utwórz kolekcję w Ustawienia → Model danych, według poniższej tabeli. Nazwa techniczna: `sacraments`, etykieta: „Sakramenty”.

| Pole | Typ / interfejs | Zasady |
| --- | --- | --- |
| `id` | UUID | Klucz główny, generowany automatycznie |
| `status` | String / lista | `draft`, `published`, `archived`; domyślnie `draft` |
| `slug` | String / lista | Unikalny i wymagany; wartości poniżej |
| `title` | String / input | Wymagany, tytuł sekcji |
| `description` | Text / input-multiline | Wymagany, krótki opis |
| `preparation` | Text / input-multiline | Wymagany, przygotowanie, terminy i wskazówki |
| `documents` | Text / input-multiline | Opcjonalny, dokumenty i formalności |

Dozwolone slugi: `chrzest`, `bierzmowanie`, `eucharystia`, `pokuta-i-pojednanie`, `namaszczenie-chorych`, `malzenstwo`, `kaplanstwo`. Pozostałe slugi nie są wyświetlane. Pola treści zawierają zwykły tekst, z zachowaniem nowych linii; HTML nie jest wykonywany.

Plik `directus/sacraments.items.json` zawiera siedem startowych szkiców. Zaimportuj go w widoku kolekcji lub wyślij jednorazowo jako body **POST /items/sacraments**. Przed publikacją uzupełnij lokalne terminy, dokumenty i zasady. Nie importuj ponownie istniejących slugów.

### Konta i uprawnienia

- Administrator dodaje kolekcję i zaprasza imienne konto redaktora do panelu Directusa.
- Polityka „Redaktor sakramentów”: dostęp do aplikacji, bez dostępu administracyjnego; create/read/update wyłącznie do `sacraments`, bez delete. Pola edycji: `slug`, `status`, `title`, `description`, `preparation`, `documents`; `id` tylko do odczytu. Redaktor może publikować.
- Konto używane przez build (`DIRECTUS_API_TOKEN`): tylko read do potrzebnych kolekcji. Dla `sacraments` filtr rekordów `{"status":{"_eq":"published"}}`; pola `slug,status,title,description,preparation,documents`. Nie używaj tokenu administratora.
- Public nie potrzebuje dostępu do kolekcji, jeśli build używa tokenu. Jeśli strona buduje się bez tokenu, nadaj Public wyłącznie taki sam odczyt opublikowanych rekordów. Nigdy nie nadawaj Public praw zapisu.

`directus/access-control.json` jest opisem zasad, nie automatyczną migracją uprawnień. Utworzenie kolekcji nie przyznaje redaktorom dostępu — polityki należy przypisać w panelu.

### Publikowanie i brak CMS

Serwis `src/services/sacraments.ts` pobiera opublikowane rekordy podczas budowania Astro i sprawdza ich strukturę. Poprawny rekord zastępuje całą lokalną sekcję o tym samym slugu. Brak rekordu, szkic, archiwizacja, puste wymagane pola lub niedostępność CMS oznacza powrót do ogólnej treści z Markdown dla danego sakramentu. Archiwizacja nie usuwa sekcji z publicznej strony; usuwa jej parafialne uzupełnienie po kolejnym buildzie.

Dodaj `sacraments` do Flow uruchamiającego deploy hook Cloudflare Pages po utworzeniu, aktualizacji i usunięciu rekordu. Obsłuż również zmianę statusu z published na draft/archived; Flow ograniczony do nowego statusu published nie odświeży wycofanego tekstu. Zmiana jest widoczna po udanym buildzie i wdrożeniu. Adres hooka i token pozostają po stronie serwera.

Konfiguracja instancji, kont i Flow wymaga wykonania powyższych kroków przez administratora. Pliki w repozytorium przygotowują integrację, ale nie modyfikują działającego CMS.

## Kontakt i historia — import API

Nowa kolekcja `parish_pages` („Kontakt i historia”) przechowuje dwa rekordy o unikalnych slugach `kontakt` i `historia`. Pliki:

- `directus/parish-pages.collection.json`: body POST `/collections`, tworzy kolekcję i pola.
- `directus/parish-pages.items.json`: body POST `/items/parish_pages`, dodaje dwa szkice z treścią.

Z katalogu projektu, przy działającym lokalnym Directusie:

```powershell
$token = Read-Host "Token administratora Directusa" -MaskInput
$headers = @{ Authorization = "Bearer $token" }
Invoke-RestMethod -Method Post -Uri "http://localhost:8055/collections" -Headers $headers -ContentType "application/json; charset=utf-8" -InFile "./directus/parish-pages.collection.json"
Invoke-RestMethod -Method Post -Uri "http://localhost:8055/items/parish_pages" -Headers $headers -ContentType "application/json; charset=utf-8" -InFile "./directus/parish-pages.items.json"
```

Import wykonaj raz. Następnie sprawdź wpisy i ustaw status `published`. Dla kontaktu wypełnij adres, kod i miejscowość oraz telefon. E-mail i godziny kancelarii są opcjonalne. Puste godziny korzystają z istniejącego `homepage.office_hours`. Historię wpisuj jako zwykły tekst, oddzielając akapity pustą linią (HTML nie jest interpretowany). `source_url` to opcjonalny adres źródła HTTP/HTTPS.

Redaktor: app access oraz create/read/update `parish_pages`, bez uprawnień administracyjnych. Odczyt dla tokenu budowania strony (lub Public przy budowie bez tokenu): filtr `status = published`, pola `slug,status,title,description,content,address,postal_address,phone,email,office_hours,source_url`. Edytor nie musi mieć delete. Dodaj kolekcję do Flow uruchamiającego build po create/update/delete, w tym wycofaniu publikacji.

Serwis `parish-pages.ts` waliduje dane. Brak opublikowanego lub poprawnego wpisu oznacza powrót do Markdown. Kontakt jest wspólnym źródłem danych dla `/kontakt`, strony głównej i stopki. Aktualizacja wymaga nowego builda. Import JSON nie zmienia automatycznie uprawnień ani Flow. Stare snapshoty schematu nie zawierają tej kolekcji — po imporcie wykonaj świeży snapshot, przed kolejnym schema apply sprawdź diff.

Treści startowe historii i adres 08-130 Kotuń oparto na oficjalnym opisie: https://diecezja.siedlce.pl/parafie/parafia-trojcy-swietej/ (odczyt 2026-09-16). Godzin kancelarii i adresu e-mail nie dopisywano bez potwierdzenia.

## Konto techniczne do kontaktu, historii i sakramentów

Skonfigurowano konto `Website Pages reader` z polityką `Website pages reader`: tylko read do `parish_pages` i `sacraments`, bez app access, admin access i praw zapisu. Konto techniczne może odczytać również szkice; warstwa usług strony żąda i waliduje wyłącznie `status=published`.

Token zapisany jest jako `DIRECTUS_PAGES_API_TOKEN` w lokalnym `.env`. Nie wyświetlaj go i nie dodawaj do repozytorium. W środowisku hostingu ustaw tę samą zmienną jako sekret budowania. Pozostałe kolekcje korzystają z dotychczasowego dostępu. Public nie otrzymuje odczytu tych dwóch kolekcji.

W `npm run dev` zapisane, opublikowane treści są pobierane przy odświeżeniu strony. Dla `npm run preview` i wdrożenia statycznego wymagany jest nowy build. Zmiana pliku `.env` może wymagać restartu serwera deweloperskiego.

## Intencje tygodniowe (2026-09-28)

Nowym źródłem strony i sekcji na stronie głównej jest kolekcja weekly_intentions (Intencje mszalne — tygodnie). Jeden rekord obejmuje poniedziałek–niedzielę.

1. Otwórz kolekcję „Intencje mszalne — tygodnie” i dodaj wpis.
2. Wybierz datę poniedziałku w polu „Początek tygodnia”. Nie wybieraj innego dnia — taki wpis nie pojawi się na stronie. Data musi być unikalna; istniejący tydzień należy edytować.
3. Skopiuj z Worda całą treść wraz z nazwami dni i godzinami i wklej w „Intencje na cały tydzień”.
4. Sprawdź podziały wierszy, ustaw status Opublikowany i zapisz.

Pole jest zwykłym tekstem: zachowuje akapity i nowe linie, bez pogrubień, tabel i czcionek Worda. Treść nie jest automatycznie dzielona na pojedyncze msze. HTML jest wyświetlany jako tekst, nie wykonywany.

Plik directus/weekly-intentions.collection.json jest body POST /collections dla nowej instancji. Lokalna kolekcja została już utworzona — nie importuj ponownie. Pięć starych opublikowanych wpisów skopiowano do dwóch tygodni. Oryginały pozostawiono w „Intencje — stare pojedyncze wpisy”; ich edycja nie zmienia już strony. Szkiców nie publikowano.

Polityka Website pages reader otrzymała wyłącznie read do weekly_intentions. Serwer korzysta z istniejącego DIRECTUS_PAGES_API_TOKEN; Public nie otrzymał dostępu. Frontend pobiera i sprawdza status published. Dla osobnego konta redaktora skonfiguruj create/read/update tej kolekcji bez admin access. Zmiana istniejącego opublikowanego tygodnia na draft/archived usuwa go ze strony po przebudowaniu.

Kalendarz pokazuje pełne tygodnie także wtedy, gdy przecinają granicę miesiąca lub roku. Kliknięcie dnia prowadzi do treści całego tygodnia. Kropka oznacza dostępność planu tygodniowego, nie potwierdza mszy w konkretnym dniu. Link ?tydzien=YYYY-MM-DD otwiera wybrany opublikowany tydzień.

Dev pobiera treść po odświeżeniu; wersja statyczna wymaga builda i wdrożenia. Dodaj weekly_intentions do istniejącego deploy Flow dla create/update/delete, także przy wycofaniu publikacji. Nie zmieniono zdalnego wdrożenia ani jego Flow. Po zmianach wykonaj nowy snapshot schematu; stare schema.yaml nie zawiera tej kolekcji.
