import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Column from '../Column/Column';
import AddColumnButton from '../AddColumnButton/AddColumnButton';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetColumnsQuery } from '../../api/column.api';
import { ErrorObject, IColumn } from '../../types/types';
import { Spinner } from '../Spinner/Spinner';
import ColumnAddModal from '../ColumnAddModal/ColumnAddModal';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addBoards, addUsers } from '../../features/columnSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useOnDragEnd } from '../../hooks/useOnDragEnd';
import { useGetUsersQuery } from '../../api/user.api';
import { INVALID_TOKEN, LINKS } from 'constants/constants';
import { logout } from 'features/authSlice';

const boxStyles = {
  display: 'flex',
  flexWrap: 'nowrap',
  gap: '1rem',
  overflow: 'auto',
  padding: '1rem',
  height: 'calc(100vh - 216px)',
};

const ColumnsWrapper = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, error } = useGetColumnsQuery(boardId as string);
  const { data: users } = useGetUsersQuery();
  const { columns } = useAppSelector((state) => state.boardState);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [buttonId, setButtonId] = useState('');
  const [columnId, setColumnId] = useState('');

  useEffect(() => {
    if (data) {
      dispatch(addBoards(data));
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (users) {
      dispatch(addUsers(users));
    }
  }, [users, dispatch]);

  useEffect(() => {
    if ((error as ErrorObject)?.data?.message === INVALID_TOKEN) {
      navigate(LINKS.welcome);
      dispatch(logout());
    }
  }, [dispatch, navigate, error]);

  const handleClose = () => setOpen(false);
  const handleOpen = (buttonId: string, columnId?: string) => {
    setOpen(true);
    setButtonId(buttonId);
    setColumnId(columnId || '');
  };

  const onDragEnd = useOnDragEnd();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={boxStyles}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {(provided) => (
            <Box
              sx={{ display: 'flex', gap: '1rem' }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columns?.map((column: IColumn, idx) => (
                <Column
                  key={column._id}
                  boardId={boardId}
                  id={column._id || ''}
                  order={idx}
                  name={column.title}
                  onClick={handleOpen}
                />
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
        <AddColumnButton onClick={handleOpen} />
        <ColumnAddModal
          boardId={boardId}
          columnId={columnId}
          pressedButtonId={buttonId}
          open={open}
          onClose={handleClose}
        />
      </Box>
    </DragDropContext>
  );
};

export default ColumnsWrapper;
