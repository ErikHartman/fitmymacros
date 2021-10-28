import { CsvToHtmlTable } from "react-csv-to-table";
import "./components.css";

function Recipe() {
  const data = "test1, test2";

  return (
    <div className="recipe-container">
      <CsvToHtmlTable data={data} csvDelimiter="," ClassName="recipe-table" />
    </div>
  );
}

export default Recipe;
