import React from 'react';
import PageRow from './PageRow';

/* Content Table */
const ContentTable = (props)=> {
	return (
		<ul className="crawl-pages">
			{props.pages.map((page, i) => {
				return(
					<PageRow page_index={i} page={page} key={i} ></PageRow>
				)
			})}
		</ul>
	)
	
}

export default ContentTable;