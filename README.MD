# Juhised rakenduse käivitamiseks

## Docker
1. Veenduge, et teil on Docker installitud.
2. Liikuge projekti juurkataloogi.
3. Avage terminal ja sisestage käsk: `docker-compose up --build`.
   - Frontend töötab pordil 4200.

## Alternatiivne Variant
### PostgreSQL
1. Veenduge, et teil on PostgreSQL installitud.
2. Leidke projekti pearepositooriumist `backup.sql` fail.
3. Terminalis navigeerige kataloogi, kus asub `backup.sql`.
4. Käivitage järgmine käsk: `psql -U postgres -d contact_db -f backup.sql`.
   - Asendage 'postgres' oma PostgreSQL kasutajanimega ja 'contact_db' oma andmebaasi nimega, kui need on erinevad.
   - Sisestage oma PostgreSQL parool, kui seda küsitakse.
   - Veenduge, et teie rakenduse seadistus (application.properties) ühtib teie PostgreSQL seadetega.

### Spring Boot
1. Veenduge, et olete installinud Java (JDK 17).
2. Impordige Maven projekt.
3. Käivitage `ContactManagerApplication` IDE-st.

### Angular
1. Veenduge, et olete installinud NodeJS (versioon 18+).
2. Avage terminal.
3. Navigeerige projekti frontend kataloogi - `cd frontend`.
4. Installige kõik sõltuvused `npm install` abil.
5. Käivitage arendusserver `npm run start`.
   - Frontend töötab pordil 4200. 