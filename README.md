# flight-finder-pgp

## To start

1. Clone the repo

## How to start the backend

( in a terminal)

1. CD into: "flight-finder-pgp"
2. CD into: "FlightFinderBackend"
3. Run: "dotnet restore .\FlightFinderApi\"
4. Run: "dotnet run --project .\FlightFinderApi\"

There we go!

## How to start the frontend

( in a new terminal )

1. CD into: "flight-finder-pgp"
2. CD into: "flight-finder-frontend"
3. Run: "npm i"
4. Run: "npm run dev"

Ta-Da! You're all set!

## If the database/data feels like it's getting really thin

1. In the backend project there's a file called "backup.json" in a folder called "Data", copy the contents of the document
2. In "Data", go to "data.json" and remove it's contents
3. Paste the contents of "backup.json" in "data.json"
4. Save what you just did
5. CD into: "FlightFinderBackend"
6. Run: "dotnet run --project .\FlightFinderApi\"

That should do it!
