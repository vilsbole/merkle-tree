## Case Study

1. What would be an efficient way to modelize this? (models and database)

   Considering:

   - A tournament is an event which occurs once per week.
   - Multiple leagues participate in a tournament.
   - A user can submit one team per league per tournament.
   - A team is a temporary reunion of PlayerCards for a tournament.
   - A PlayerCard may only belong to a single team per tournament.

   We can model a relational database such as:
   ![Schema](https://user-images.githubusercontent.com/2429708/113555168-bb335c00-95fa-11eb-9658-231740fab1d7.png)

   Ignoring no-relational attributes and creation logic constraints, we would write the following models [pseudo-ror]:

   ```
   class User
   end

   class Player
   end

   class League
   end

   class Tournament
   end

   class TournamentLeague
     belongs_to: league
     belongs_to: tournament
     has_many: team
   end

   class Team
   belongs_to: user
   belongs_to: tournament_league
   has_many: player_card
   end

   class PlayerCard
   belongs_to: player
   belongs_to: user
   end

   ```

2. What is your strategy to update rankings in real time?

   Since:

   - a player card score is the product of it's real life stats and a bonus coefficient.
   - a team ranking is the sum of the player cards scores.

   A potentiel strategy to provide real time rankings would be to calculate each teams ranking on the fly.

   At the start of each tournament we would provide a service for each league (20 services) which would fetch and store in memory a dictionary containing the ranking and player cards for each team partcipating in the league (1000 per league), as well as a dictionary of the bonus coefficients and latest stat for each player card participating in the league (5 \* 1000).

   The service would then be responsable for:

   - polling the data provider
   - updating the player card stat
   - calculating the ranking per team
   - pushing the new team rankings to the client

3. What are the trade-offs?

   By caching the player stats we greatly reduce the amount of database writes.

   The main trade-offs are:

   - in the eventuality of a failure of the service the client would loose the socket connection. It would need to request a new connection after the service has been restarted.
   - we would be unable to derive a ranking from a players stat evolution during the tournament since we stats time series is not persisted.
