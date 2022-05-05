import TableRow from './TableRow';

const ContentTable = ({ pages })=> {
	return (
		<ul className="contentTable">
			{pages.map((page, i) => {
				return(
					<TableRow key={i} page_index={i} page={page} />
				)
			})}
		</ul>
	)
}

export default ContentTable;