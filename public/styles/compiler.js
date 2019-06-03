const sass = require("node-sass");
const argv = require("yargs").argv;
const fs = require("fs");
const path = require("path");

//console.clear();
const file = path.resolve(argv.file);
const folder = RegExp(/\/.*\//).exec(file)[0];
const css = `${file}.css`;
const scss = `${file}.scss`;

let data = fs.readFileSync(scss, { encoding: "utf8" });
data = `$root: "/${argv.env === "p" ? "storyteller/" : ""}"; ${data}`;

sass.render(
  {
    data,
    sourceMap: true,
    outFile: css,
    includePaths: [folder]
  },
  (err, result) => {
    if (!err) {
      // No errors during the compilation, write this result on the disk
      fs.writeFileSync(css, result.css);
      fs.writeFileSync(`${css}.map`, result.map);
      console.log(`Rendered ${scss} to ${css}`);
    } else console.log(err);
  }
);
