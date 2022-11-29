import './todolist.component.css'
import { useEffect, useState } from 'react'
import axios from 'axios';
export function Todolist() {
    const [todo, setTodo] = useState('')
    const [todolist, setTodolist] = useState([])
    const [search, setSearch] = useState('')
    const [fillterdata, setfillterdata] = useState([])
    const URL = 'http://3.37.31.104:3201/todo?name=danh';
    const CONSTANT = {
        NOTFOUND : 'NOTFOUND'
    }
    const handleSubmit = () => {
        setTodolist(prev => [...prev, todo])
        const job1 = {
            name: 'danh',
            title: todo
        };
        axios.post(URL, job1)
        setTodo('')
    }
    
    
    
    const handleDelete = (id) => {
        axios.delete(URL, {
            data: {
                name: "danh",
                idx: id
            }
        });
        setTodolist(prev => [...prev, todo])
    }
    
    const handleSearch = (e) => {
        setSearch(e.target.value)
        const filterList = todolist.filter(item => item.TITLE === search)
        setfillterdata(filterList)
        
    }
    useEffect(() => {
        axios.get(URL)
            .then(response => response.data)
            .then((res) => {
                setTodolist(res.data)
                const jsonjob1 = JSON.stringify(todolist)
                localStorage.setItem('todoList', jsonjob1)
            });
    }, [todolist])
    return (
        <>
            <div className={"header"}>
                <h1 >TodoList</h1>
                <input type="fillterdata"
                    placeholder="Title..."
                    value={todo}
                    onChange={e => setTodo(e.target.value)}
                />
                <button onClick={handleSubmit} className={"addBtn"}>Add </button> 
                <input type="fillterdata"
                    placeholder="Search..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}

                />
                <button onClick={handleSearch} className={"addBtn"} data-toggle="modal" data-target="#exampleModalCenter">Search </button>
            </div>
            <ul >
                {
                    todolist.length > 0 && (
                        todolist.map((item, key) => {
                            return (
                                <li key={key} className="mt-4">
                                    {item.TITLE}
                                    <button className='btn-danger ml-4' onClick={() => handleDelete(item.IDX, item.TITLE)}>Delete</button>
                                </li>
                            )
                        })
                    )
                }
                {
                    fillterdata.length > 0 ? (fillterdata.map((b, key) => {
                        return (
                            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLongTitle">Result</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <span>{b.TITLE}</span>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })) : (
                        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLongTitle">Result</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <span>{CONSTANT.NOTFOUND}</span>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                    )



                }
            </ul>
        </>
    )

}