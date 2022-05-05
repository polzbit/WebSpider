import TableRow from "./TableRow";

const ContentTable = ({ pages }) => {
  return (
    <div className="contentTable" data-testid="contentTable">
      {pages.map((page, i) => {
        return <TableRow key={i} page_index={i} page={page} />;
      })}
    </div>
  );
};

export default ContentTable;
