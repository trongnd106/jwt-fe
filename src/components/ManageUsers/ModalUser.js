import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { fetchGroup } from '../../services/userService';
import { toast } from 'react-toastify';
import _ from 'lodash';

const ModalUser = (props) => {
    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
        group: ''
    }

    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        group: true
    }


    const [userData, setUserData] = useState(defaultUserData);
    const [validInputs, setValidInputs] = useState(validInputsDefault);

    const [userGroups, getUserGroups] = useState([]);

    useEffect(() => {
        getGroups();
    }, [])

    const getGroups = async () => {
        let response = await fetchGroup();
        if(response && response.data && response.data.EC === 0){
            getUserGroups(response.data.DT)
        } else {
            toast.error(response.data.EM);
        }
    }

    const handleOnchangeInput = async (value, name) => {
        let _userData = _.cloneDeep(userData);   //copy -> clone
        _userData[name] = value;
        setUserData(_userData)
    }
    
    const checkValidateInputs = () => {
        // create user
        setValidInputs(validInputsDefault)
        let arr = ['email', 'phone', 'password', 'group']
        let check = true;
        for(let i = 0; i < arr.length; i++){
            if(!userData[arr[i]]){
                toast.error(`Empty input ${arr[i]}`)
                let _validInputs = _.cloneDeep(validInputsDefault)
                _validInputs[arr[i]] = false

                setValidInputs(_validInputs)
                check = false;
                break;
            }
        }
        return check;
    }

    const handleConfirmUser = () => {
        checkValidateInputs()
    }

    return (
        <>
            <Modal size="lg" show={true} className='modal-user'>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span>{props.title}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Email address(<span className='red'>*</span>):</label>
                            <input className= {validInputs.email ? 'form-control' : 'form-control is-invalid'} 
                                type='email' value={userData.email}
                                onChange={(event) => handleOnchangeInput(event.target.value, "email")}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Phone number(<span className='red'>*</span>):</label>
                            <input className={validInputs.phone ? 'form-control' : 'form-control is-invalid'} 
                                type='text' value={userData.phone}
                                onChange={(event) => handleOnchangeInput(event.target.value, "phone")}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Username:</label>
                            <input className={validInputs.username ? 'form-control' : 'form-control is-invalid'} 
                                type='text' value={userData.username}
                                onChange={(event) => handleOnchangeInput(event.target.value, "username")}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Password(<span className='red'>*</span>):</label>
                            <input className={validInputs.password ? 'form-control' : 'form-control is-invalid'} 
                                type='password' value={userData.password}
                                onChange={(event) => handleOnchangeInput(event.target.value, "password")}
                            />
                        </div>
                        <div className='col-12 col-sm-12 form-group'>
                            <label>Address:</label>
                            <input className={validInputs.address ? 'form-control' : 'form-control is-invalid'} 
                                type='text' value={userData.address}
                                onChange={(event) => handleOnchangeInput(event.target.value, "address")}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Gender:</label>
                            <select 
                                className='form-select'
                                onChange={(event) => handleOnchangeInput(event.target.value, "sex")}
                            >
                                <option defaultValue="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Group(<span className='red'>*</span>):</label>
                            <select 
                                className='form-select'
                                onChange={(event) => handleOnchangeInput(event.target.value, "group")}
                            >
                                {userGroups.length > 0 &&
                                    userGroups.map((item,index) => {
                                        return (
                                            <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleConfirmUser()}>
                        Save
                    </Button>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>                   
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUser