import { useContext } from 'react';
import { UiContext } from '../context/UiContext';

const useMenu = (show) => {
    const {hideMenu, showMenu} = useContext(UiContext)

    if (show) showMenu()
    else hideMenu()
}

export default useMenu