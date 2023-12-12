*************************************************************************************************
Achtung! Diese API ist nur für dieses Modul konzipiert. Nie in einem produktiven Umfeld benutzen!
- Es fehlen Validierungen
- Die Daten sind über /api/v1/entities auch ohne Autorisierug bearbeitbar
- Es fehlt ein persistenter Speicher der Daten

*************************************************************************************************
Installationsanleitung: 

Um die API zu starten müssen Sie folgendes tun:
1. Docker Desktop installieren 
	Windows: https://docs.docker.com/desktop/install/windows-install/
	Mac: https://docs.docker.com/desktop/install/mac-install/
2. In diesem Ordner (M294_LB02_Abgabe) ein Terminal öffnen und folgenden Befehl eingeben: 
      docker-compose up -d
3. Die API's sind unter folgenden URL's erreichbar: 
	1. Entities: http://localhost:2940/api/v1/entities
	2. Auth: http://localhost:2941/auth


Mögliche Fehler:
Wenn beim ausführen von coder-compose up -d folgende Fehlermeldung erscheint 
"error during connect: this error may indicate that the docker daemon is not running...", 
bedeutet dies, dass Docker für Windows/Mac nicht gestertet ist.
=> Starten Sie Docker for Windows/Mac 
 
	 
 