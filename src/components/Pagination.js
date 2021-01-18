import React, {Component} from 'react';
import {defineMaxPage} from "../selectors/todoSelector";
import {connect} from "react-redux";

class Pagination extends Component {

	render() {
		const {currentPage, changePage, maxPage} = this.props
		let pageArray = [];
		let i

		switch (currentPage) {
			case maxPage: {
				i = currentPage - 4;
				break;
			}
			case maxPage - 1: {
				i = currentPage - 3;
				break;
			}
			default:{
				i = currentPage - 2
				break;
			}

		}

		for (i; i <= maxPage; i++) {
			if (i >= 1 && pageArray.length < 5) {
				pageArray.push(i);
			}
		}


		return (
			<nav className="paginationNav" aria-label="Page navigation example">
				<ul className="pagination justify-content-center">
					<li className="page-item">
						<button
							className='btn btn-outline-primary btn-sm '
							onClick={() => changePage(1)}
						>First
						</button>
					</li>
					<li className="page-item">
						<button
							className='btn btn-outline-primary btn-sm '
							onClick={() => changePage(currentPage - 1)}
						>&laquo; Previous
						</button>
					</li>
					{
						pageArray.map(item => {
							return (
								<li
									key={item}
									className="page-item">
									<button
										disabled={item === currentPage}
										onClick={() => changePage(item)}
										className='btn btn-outline-primary btn-sm '
									>{item}
									</button>
								</li>
							)
						})
					}
					<li className="page-item">
						<button
							className='btn btn-outline-primary btn-sm '
							onClick={() => changePage(currentPage + 1)}
						>Next&raquo;</button>
					</li>
					<li className="page-item">
						<button
							className='btn btn-outline-primary btn-sm '
							onClick={() => changePage(maxPage)}
						>last
						</button>
					</li>

				</ul>
			</nav>
		)
	}
}

const mapStateToProps = state => ({
	maxPage: defineMaxPage(state),
	currentPage: state.todo.currentPage,
});

export default connect(mapStateToProps)(Pagination);
