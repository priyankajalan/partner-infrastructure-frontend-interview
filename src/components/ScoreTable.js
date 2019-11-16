/* eslint-disable no-script-url */

import React, { useEffect, useState } from 'react';
// import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Title from '../Title';
import TablePagination from '@material-ui/core/TablePagination';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import * as isoCountryList from 'countries-list';

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  filterToolbar: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    padding: '1em'
  },
  filterQueryText: {
    flex: '5', paddingRight: '1em'
  },
  filterSelectColumn: {
    flex: '2'
  }
}));

const HEADINGS = {
  first_name: 'First Name',
  last_name: 'Last Name',
  gender: 'Gender',
  city: 'City',
  country: 'Country',
  score: 'Score'
}

export default function ScoreTable(props) {
  const classes = useStyles();
  const [scores, setScores] = useState([]);
  // Sorting
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('country');
  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  // Filtering
  const [searchQuery, setSearchQuery] = useState();
  const [searchColumn, setSearchColumn] = useState('last_name');

  useEffect(() => {
    props.people && setScores(props.people)
  }, [props.people])


  // Handle Sorting
  function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
  }

  function onRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleSort = property => event => {
    onRequestSort(event, property);
  };

  const HeaderWithSort = heading_id =>
    <TableSortLabel
      active={orderBy === heading_id}
      direction={order}
      onClick={handleSort(heading_id)}
    >
      {HEADINGS[heading_id]}
    </TableSortLabel>

  // Handle Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter
  const handleFilter = e => {
    setSearchQuery(e.target.value)
  }
  const handleSelectColumn = event => {
    setSearchColumn(event.target.value)
  }

  return (
    <React.Fragment>
      <Title>Scores listing</Title>
      {/* Filter */}
      {scores && scores.length ?
        <>
          <div className={classes.filterToolbar}>
            <TextField
              className={classes.filterQueryText}
              id="outlined-basic"
              label="Filter people"
              margin="normal"
              onChange={handleFilter}
            />
            <Select
              className={classes.filterSelectColumn}
              value={searchColumn}
              onChange={handleSelectColumn}
            >
              <MenuItem value='first_name'>First Name</MenuItem>
              <MenuItem value='last_name'>Last Name</MenuItem>
              <MenuItem value='country'>Country</MenuItem>
              <MenuItem value='city'>City</MenuItem>
              <MenuItem value='gender'>Gender</MenuItem>
            </Select>
          </div>
          <Table size="small">
            <TableHead>
              <TableRow>
                {['last_name', 'first_name', 'gender', 'city', 'country', 'score'].map(heading =>
                  <TableCell
                    sortDirection={orderBy === heading ? order : false}
                    align={heading === 'score' ? 'right' : 'left'}
                    key={heading}
                  >
                    {heading === 'gender' ? HEADINGS[heading] : HeaderWithSort(heading)}
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(scores, getSorting(order, orderBy))
                .filter(people =>
                  searchQuery ? people[searchColumn] && people[searchColumn].includes(searchQuery) : people
                )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(score => (
                  <TableRow tabIndex={-1} key={score.id}>
                    <TableCell>{score.last_name}</TableCell>
                    <TableCell>{score.first_name}</TableCell>
                    <TableCell>{score.gender}</TableCell>
                    <TableCell>{score.city}</TableCell>
                    <TableCell>{isoCountryList.countries[score.country].name}</TableCell>
                    <TableCell align="right">{score.score}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[25, 50, 100]}
            component="div"
            count={scores.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'previous page',
            }}
            nextIconButtonProps={{
              'aria-label': 'next page',
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          {/* <div className={classes.seeMore}>
        <Link color="primary" href="#">
          See more scores
        </Link>
      </div> */}
        </>
        : 'Loading ...'}
    </React.Fragment>
  );
}
