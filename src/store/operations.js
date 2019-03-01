const EOL = "\n";

export const addPageBreak = `~page`;

export const addColumnBreak = `\`\`\`${EOL}\`\`\``;

export const addWideContent = `<div class="wide">Wide Content</div>`;

export const addSomeRoom = `<div style='margin:5ch 0'></div>`;

export const addCoverPage = `
<div class="cover wide">

# Cover Title Goes Here

##### Your awesome subtitle with a catchy phrase goes here
</div>
${addPageBreak}
`

export const addWideClassTable = `
<div class="classTable wide">

##### Class Name
| Level | Proficiency Bonus | Features | Cantrips Known | Spells Known | 1st | 2nd | 3rd | 4th | 5th | 6th | 7th | 8th | 9th |
|:---:|:---:|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 1st | +2 | ─ | 3 | 1 | 2 | — | — | — | — | — | — | — | — |
| 2nd | +2 | ─ | 3 | 1 | 2 | — | — | — | — | — | — | — | — |
| 3rd | +2 | ─ | 4 | 2 | 2 | — | — | — | — | — | — | — | — |
| 4th | +2 | ─ | 4 | 3 | 3 | — | — | — | — | — | — | — | — |
| 5th | +3 | ─ | 4 | 3 | 4 | — | — | — | — | — | — | — | — |
| 6th | +3 | Ability Score Improvement | 5 | 4 | 4 | — | — | — | — | — | — | — | — |
| 7th | +3 | ─ | 5 | 4 | 4 | — | — | — | — | — | — | — | — |
| 8th | +3 | ─ | 5 | 5 | 4 | 1 | — | — | — | — | — | — | — |
| 9th | +4 | ─ | 5 | 5 | 4 | 3 | — | — | — | — | — | — | — |
| 10th | +4 | ─ | 6 | 6 | 4 | 3 | 2 | — | — | — | — | — | — |
| 11th | +4 | ─ | 7 | 7 | 4 | 3 | 2 | — | — | — | — | — | — |
| 12th | +4 | ─ | 8 | 7 | 4 | 3 | 3 | 1 | — | — | — | — | — |
| 13th | +5 | ─ | 8 | 7 | 4 | 3 | 3 | 3 | — | — | — | — | — |
| 14th | +5 | ─ | 9 | 7 | 4 | 3 | 3 | 3 | 2 | — | — | — | — |
| 15th | +5 | ─ | 10 | 8 | 4 | 3 | 3 | 3 | 3 | 1 | — | — | — |
| 16th | +5 | ─ | 11 | 9 | 4 | 3 | 3 | 3 | 3 | 1 | — | — | — |
| 17th | +6 | ─ | 11 | 10 | 4 | 3 | 3 | 3 | 3 | 2 | 1 | — | — |
| 18th | +6 | ─ | 12 | 11 | 4 | 3 | 3 | 3 | 3 | 2 | 2 | — | — |
| 19th | +6 | ─ | 12 | 12 | 4 | 3 | 3 | 3 | 3 | 2 | 2 | — | — |
| 20th | +6 | ─ | 13 | 12 | 4 | 3 | 3 | 3 | 3 | 2 | 2 | 1 | — |

</div>
`;

export const addClassTable = `
<div class='classTable'>
  
##### Class Name
| Level | Proficiency Bonus | Features | Important Skill|
|:---:|:---:|:---|:---:|
| 1st | +2 | Spiritual Biochemistry | +1 |
| 2nd | +2 | Police Necromancer | +2 |
| 3rd | +2 | Consecrated Biochemistry | +2 |
| 17th | +6 | Gunslinger Corruptor | +8 |

</div>
`;

export const addTable = `
##### Table Header
| Topic 1 | Topic 2 |
|:----:|:-------------|
| Content | Content |
`

export const addWideTable = `
<div class="wide">
${addTable}
</div>
`

export const addCompactTables = `
<div style='column-count:2'>

| d10 | Damage Type |
|:---:|:------------|
|  1  | Acid        |
|  2  | Cold        |
|  3  | Fire        |
|  4  | Force       |
|  5  | Lightning   |

\`\`\`
\`\`\`

| d10 | Damage Type |
|:---:|:------------|
|  6  | Necrotic    |
|  7  | Poison      |
|  8  | Psychic     |
|  9  | Radiant     |
|  10 | Thunder     |
</div>
`