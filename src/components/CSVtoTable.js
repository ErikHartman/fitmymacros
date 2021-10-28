import { CsvToHtmlTable } from "react-csv-to-table";
import "./components.css";

function Recipe() {
  const results = "data";

  return (
    <div className="recipe-container">
      <CsvToHtmlTable
        data={results}
        csvDelimiter=","
        ClassName="recipe-table"
      />
    </div>
  );
}

export default Recipe;
