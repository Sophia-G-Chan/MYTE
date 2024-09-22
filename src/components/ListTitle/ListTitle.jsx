import { useContext, useEffect, useState } from 'react'
import { Api } from '../../api/Api';
import { TasksContext } from '../../App';

function ListTitle() {
    const api = new Api();
    const { selectedListId, lists } = useContext(TasksContext);
    const [newListName, setNewListName] = useState({
        list_name: ""
    });


    const handleListNameChange = async (event) => {
        const list_name = event.target.value;
        setNewListName({ list_name });

        try {
            if (selectedListId) {
                const response = await api.editAList(selectedListId, {list_name})
            } else {
                const response = await api.addAlist({list_name});
            }
        } catch (error) {
            console.log('Unable to edit task')
        }
    }

    useEffect(() => {
        if (selectedListId) {
            console.log(newListName.list_name)
            const selectedList = lists.find(listItem => listItem.id === selectedListId);
            if (selectedList) {
                setNewListName({list_name: selectedList.list_name})
            }
        } else{
            setNewListName({ list_name: ""})
        }

    }, [selectedListId, lists])
    return (

        <form className="mb-5">
            <input type="text"
                placeholder="List Name"
                name='list_name'
                value={newListName.list_name}
                onChange={handleListNameChange}>
            </input>
        </form>
    )
}

export default ListTitle
