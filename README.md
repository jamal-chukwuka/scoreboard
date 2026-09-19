# Learning Scoreboard

A lightweight public learning league. Participants can track progress across school coursework, LeetCode, Udemy, AlgoExpert, Frontend Masters, projects, and other structured learning.

## Evidence model

GitHub is the common evidence layer. A participant's learning source can live anywhere, but progress that counts toward the scoreboard is represented by commits in a GitHub repository.

The public app should consume only a sanitized progress projection: participant, activity label, points, streak, progress, and source repository. Detailed evidence and scoring rules do not belong in this public repository.

## Supported activity

- School / university coursework
- LeetCode and coding practice
- Udemy
- AlgoExpert
- Frontend Masters
- Projects
- Other structured learning

## Participant contract

Each participant provides a GitHub username and a repository used for learning evidence. Future automation can validate qualifying commits and update a generated public progress snapshot.

## Development

```bash
npm install
npm start
```

Pushes to `main` deploy automatically to GitHub Pages.
