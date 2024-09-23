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
                await api.editAList(selectedListId, newListName);
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
                setLists(previousList => [...previousList, data])
                setSelectedListId(data.id)
                setNewListName({ list_name: data.list_name })
            } catch (error) {
                console.log("Unable to create new list")
            }
        }
    }

    useEffect(() => {
        if (selectedListId) {
            const selectedList = lists.find(listItem => listItem.id === selectedListId);
            if (selectedList) {
                    setNewListName({ list_name: selectedList.list_name })
            }
        } else {
            setNewListName({ list_name: "" })
        }
    }, [selectedListId, lists])

    return (
        <form className="mb-5 flex tablet:justify-between tablet:mr-2">
            <input type="text"
                className='rounded py-2 px-4 w-full tablet:w-1/2'
                placeholder="List Name"
                name='list_name'
                value={newListName.list_name || ""}
                onChange={handleListNameChange}>
            </input>
            <div className='flex '>
                <div className="w-full" >
                    <img
                        title='save list name'
                        src={saveIcon}
                        alt='save icon'
                        onClick={handleSubmit}
                        className="cursor-pointer filter save-effect save-icon w-8" />
                </div>
                <DeleteModal id={selectedListId} list_name={newListName.list_name} isTask={false}/>
            </div>
        </form>
    )
}

export default ListTitle
