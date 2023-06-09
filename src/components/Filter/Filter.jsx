import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../store/filterSlice';
import css from './Filter.module.css';
import { getContacts, getFilter } from '../../store/selectors';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  const isInputDisabled = useSelector(getContacts).length ? false : true;

  return (
    <label>
      Find contact by name:
      <input
        className={css.input}
        type="text"
        value={filter}
        disabled={isInputDisabled}
        onChange={({ currentTarget: { value } }) => {
          dispatch(setFilter(value));
        }}
      />
    </label>
  );
};
