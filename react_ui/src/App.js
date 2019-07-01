/** @format */
// @flow

import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Box } from "grommet"
import { fetchColumns } from "./_redux/columnActions"

const App = ({
  activePatent,
  activeColumn,
  columns,
  loading,
  columnImages,
  fetchColumns,
}: {
  activePatent: number,
  activeColumn: number,
  columns: Array<Object>,
  loading: boolean,
  columnImages: Array<Object>,
  fetchColumns: ({}) => void,
}) => {
  // page options are form, list, patent
  const [page, setPage] = useState("patent")
  const [column, setColumn] = useState(1)

  useEffect(() => {
    if (page === "patent") {
      console.log(page, activePatent)
      fetchColumns({ activePatent, column })
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

const mapState = ({ layout, column }) => ({
  activeColumn: column.activeColumn,
  activePatent: column.activePatent,
  images: column.images,
  loading: column.loading,
})

const mapDispatch = dispatch => ({
  fetchColumns: bindActionCreators(fetchColumns, dispatch),
})

export default connect(
  mapState,
  mapDispatch,
)(App)
