## players

player_id int PK
name string

## player_cards

player_card_id PK int
player int FK >- players.player_id
owner int FK >- users.user_id
bonus_coefficient int

## users

user_id PK int
pseudo string
pwd string

## teams

team_id PK int
owner int FK >- User.user_id
tournament_league int FK >- tournament_leagues.tournament_league_id
players int FK >-< players.player_id

## tournaments

tournament_id PK int
date_start date
date_end date

## tournament_leagues

tournament_league_id PK int
league int FK >- leagues.league_id
tournament int FK >- tournaments.tournament_id

## leagues

league_id PK int
name string
