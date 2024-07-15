import React, { useState, useEffect, useCallback } from 'react';
import { getUsers } from '../../services/userService';
import './Table.css';
import {
  DataGrid,
  getGridNumericOperators,
  getGridStringOperators,
  GridColDef,
  GridSortModel,
  GridToolbar,
} from '@mui/x-data-grid';
import { Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { User } from '@prisma/client';
import { filter } from 'rxjs';

function Table() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [queryOptions, setQueryOptions] = useState<{
    field: string;
    sort: string;
    page: number;
    pageSize: number;
    column: string;
    operator: string;
    value: string;
  }>({
    field: 'id',
    sort: 'asc',
    page: 0,
    pageSize: 10,
    column: '',
    operator: '',
    value: '',
  });

  const filterOperators = getGridStringOperators().filter(
    (operator) => operator.value !== 'isAnyOf',
  );

  const filterNumericOperators = getGridStringOperators().filter(
    (operator) =>
      operator.value !== 'isAnyOf' &&
      operator.value !== 'contains' &&
      operator.value !== 'startsWith' &&
      operator.value !== 'endsWith',
  );

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 0.5,
      disableColumnMenu: true,
      filterable: true,
      sortable: true,
      filterOperators: filterNumericOperators,
    },
    {
      field: 'firstName',
      headerName: 'First Name',
      flex: 0.5,
      disableColumnMenu: true,
      filterable: true,
      sortable: true,
      filterOperators: filterOperators,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      flex: 0.5,
      disableColumnMenu: true,
      filterable: true,
      sortable: true,
      filterOperators: filterOperators,
    },
    {
      field: 'gender',
      headerName: 'Gender',
      flex: 0.5,
      disableColumnMenu: true,
      filterable: true,
      sortable: true,
      filterOperators: filterOperators,
    },
  ];

  columns[columns.length - 2].renderCell = (params) => {
    return (
      <div className="item-history">
        {params.value.split(',').map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    );
  };

  columns[columns.length - 1].renderCell = (params) => {
    return (
      <div className="actions">
        <button onClick={() => navigate(`user/${params.row.id}`)}>View</button>
      </div>
    );
  };

  const rows = users?.map((user) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
    gender: user.gender,
    interests: user.interests.join(', '),
    itemHistory: user.itemHistory.join(', '),
  }));

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getUsers(queryOptions);
        setTotal(data.total > 0 ? data.total : 0); 
        setUsers(data.users.length > 0 ? data.users : []);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [queryOptions]);

  const handleSortModelChange = useCallback((sortModel: GridSortModel) => {
    if (sortModel !== undefined && sortModel.length !== 0) {
      setQueryOptions({
        ...queryOptions,
        field: sortModel[0].field,
        sort: sortModel[0].sort,
      });
    } else {
      setQueryOptions({ ...queryOptions, field: 'id', sort: 'asc' });
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box sx={{ height: window.screen.availHeight - 200, width: '100%' }}>
      <>
        <DataGrid
          {...users}
          rows={rows}
          rowCount={total}
          columns={columns}
          pagination={true}
          getRowHeight={() => 'auto'}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          filterMode="server"
          paginationMode="server"
          sortingMode="server"
          onSortModelChange={handleSortModelChange}
          filterDebounceMs={500}
          paginationModel={{
            ...queryOptions,
            page: queryOptions.page,
            pageSize: queryOptions.pageSize,
          }}
          onPaginationModelChange={(model) =>
            setQueryOptions({
              ...queryOptions,
              page: model.page,
              pageSize: model.pageSize,
            })
          }
          onFilterModelChange={(model) => {
            if (model.items.length > 0) {
              setQueryOptions({
                ...queryOptions,
                column: model.items[0].field,
                operator: model.items[0].operator,
                value: model.items[0].value,
              });
            } else {
              setQueryOptions({
                ...queryOptions,
                column: '',
                operator: '',
                value: '',
              });
            }
          }}
          sx={{ '& .MuiDataGrid-cell': { padding: '5px' } }}
          slots={{ toolbar: GridToolbar }}
        />
      </>
    </Box>
  );
}

export default Table;
