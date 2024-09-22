import { useContext, useEffect, useRef, useState } from 'react'
import { Api } from '../../api/Api';
import { TasksContext } from '../../App';
import saveIcon from "../../assets/icons/save.svg"
import DeleteModal from '../DeleteModal/DeleteModal';

function ListTitle() {
    const api = new Api();
    const { selectedListId, setSelectedListId, lists, setLists } = useContext(TasksContext);
    const [newListName, setNewListName] = useState({ list_name: "" });

    const handleListNameChange = (event) => {
        const { name, value } = event.target;
        setNewListName((previousList) => ({
            ...previousList,
            [name]: value,
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (selectedListId) {
            try {
                console.log(selectedListId)
                console.log(newListName)
                const response = await api.editAList(selectedListId, newListName);
                console.log(response.data)
                setLists(previousLists =>
                    previousLists.map((list) =>
                        list.id === selectedListId ? { ...list, ...newListName } : list)
                )
            } catch (error) {
                console.log("Unable to update list")
            }
        } else {
            try {
                const { data } = await api.addAList(newListName);
                console.log(data)
                setLists(previousList => [...previousList, data])
                setSelectedListId(data.id)
                setNewListName({ list_name: data.list_name })
            } catch (error) {
                console.log("Unable to create new list")
            }
        }
    }

    useEffect(() => {
        console.log(selectedListId)
        if (selectedListId) {
            const selectedList = lists.find(listItem => listItem.id === selectedListId);
                console.log(selectedList)
            if (selectedList) {
                    setNewListName({ list_name: selectedList.list_name })
            }
        } else {
            setNewListName({ list_name: "" })
        }
    }, [selectedListId, lists])

    return (
        <form className="mb-5 flex">
            <input type="text"
                placeholder="List Name"
                name='list_name'
                value={newListName.list_name || ""}
                onChange={handleListNameChange}>
            </input>
            <div className='flex'>
                <div className="w-full" >
                    <img
                        title='save list name'
                        src={saveIcon}
                        alt='save icon'
                        onClick={handleSubmit}
                        className="cursor-pointer filter save-effect save-icon w-8" />
                </div>
                <DeleteModal id={selectedListId} list_name={newListName} />
            </div>
        </form>
    )
}

export default ListTitle
