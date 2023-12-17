import React, { useEffect, useRef, useState } from 'react';
import { Button, Space, Table, Tag, Typography, Modal, Form, Input } from 'antd';
import { projectService, userService } from '../../services/service';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Layout from '../../layout/layout';
import { Editor } from '@tinymce/tinymce-react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UPDATE_PROJECT } from '../../redux/constant/user';

export default function Management() {
    const [arrcategory, setArrCategory] = useState();
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [arrProject, setArrProject] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectDetel, setProjectDetel] = useState([]);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let dataupdateProject = useSelector((state) => state.updateProject);
    console.log("🚀 ~ file: Management.jsx:23 ~ Management ~ dataupdateProject:", dataupdateProject)

    const editorRef = useRef(null);
    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };
    const handleOk = () => {
        const updatedProjectData = {
            projectName: 'Updated Project Name',
            creator: 456,
            description: 'Updated project description',
            categoryId: 'Updated Category ID',
        };

        projectService
            .putUpdateProject(selectedProjectId, updatedProjectData)
            .then(res => {
                dispatch({ type: UPDATE_PROJECT, payload: res.data.content });
                toast.success("Update thành công");
            })
            .catch(error => {
                console.error('Error updating project:', error);
                // Log or handle the error as needed
            });
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const clearFilters = () => {
        setFilteredInfo({});
    };
    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };
    const setAgeSort = () => {
        setSortedInfo({
            order: 'descend',
            columnKey: 'age',
        });
    };
    const getIndexCategory = (projectDetel) => {
        if (projectDetel && projectDetel.projectCategory) {
            const categoryIndex = arrcategory.findIndex(item => item.id === projectDetel.projectCategory.id);
            return categoryIndex >= 0 ? categoryIndex : 0;
        }
        return 0;
    }


    const showModal = (projectId) => {
        setSelectedProjectId(projectId);
        projectService
            .getProjectDetail(projectId)
            .then((res) => {
                setProjectDetel(res.data.content)
                console.log(" res:", res.data.content)
                // setArrCategory(res.data.content);
            })
            .catch((err) => {
                console.log(err);
            });
        setIsModalOpen(true);
    };

    useEffect(() => {
        userService
            .getProjectCategory()
            .then((res) => {
                setArrCategory(res.data.content);
            })
            .catch((err) => {
                console.log(err);
            });
        userService
            .getListAllProject()
            .then((res) => {
                setArrProject(res.data.content);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',

            filteredValue: filteredInfo.name || null,
            onFilter: (value, record) => record.name.includes(value),
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',

            filteredValue: filteredInfo.name || null,
            onFilter: (value, record) => record.name.includes(value),
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'categoryName',
            dataIndex: 'categoryName',
            key: 'categoryName',

            filteredValue: filteredInfo.name || null,
            onFilter: (value, record) => record.name.includes(value),
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Creator',
            dataIndex: 'creator',
            key: 'creator',
            render: (text, record) =>
                <Tag color="green">{record.creator.name}</Tag>
            ,
            filteredValue: filteredInfo.creator || null,
            onFilter: (value, record) => record.creator.name.includes(value),
            sorter: (a, b) => a.creator.name.length - b.creator.name.length,
            sortOrder: sortedInfo.columnKey === 'creator' ? sortedInfo.order : null,
            ellipsis: true,
        },
        // {
        //     title: 'Age',
        //     dataIndex: 'age',
        //     key: 'age',
        //     sorter: (a, b) => a.age - b.age,
        //     sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
        //     ellipsis: true,
        // },
        {
            title: 'Action',
            width: 150,
            fixed: 'right',
            // render: (text, record) => (
            //     < Space >
            //         <Typography.Link >
            //             <Tag className='btn_active' onClick={() => showModal(record.id)} color="#108ee9"><EditOutlined /></Tag></Typography.Link>
            //         <Typography.Link ><Tag className='btn_active' color="#cd201f"><DeleteOutlined /></Tag> </Typography.Link>
            //     </Space >
            // ),
            render: (record) => {
                return <div className="">
                    <button className='btn_active'
                        onClick={() => {
                            dispatch({ type: UPDATE_PROJECT, payload: record });
                            showModal(record.id)
                        }}
                    >
                        <Tag className='btn_active' color="#108ee9"><EditOutlined /></Tag>
                    </button>
                    <button className='btn_active'></button>
                </div>
            }
        },
    ];

    return (
        <div className='container m-5'>
            <h3 style={{ fontWeight: "700", fontSize: "28px" }}>Project Management</h3>
            <div className=' container'>
                <Space
                    className='mt-12'
                    style={{
                        marginBottom: 16,
                    }}
                >
                    <Button onClick={setAgeSort}>Sort age</Button>
                    <Button onClick={clearFilters}>Clear filters</Button>
                    <Button onClick={clearAll}>Clear filters and sorters</Button>
                </Space>
                <Table columns={columns} dataSource={arrProject} onChange={handleChange} />
            </div>
            <Modal width={window.innerWidth / 2} title="Edit Project" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    className='container'
                // onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                >
                    <div className="flex justify-between text-center " style={{ fontWeight: "700" }}>
                        <div className="">
                            <p>ID</p>
                            <Input style={{ width: "200px", color: '#000000	' }} className="py-2" value={selectedProjectId} disabled={true} />
                        </div>


                        <Form.Item
                            name="projectName"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Name Project!",
                                },
                            ]}
                        >
                            <p>Project Name</p>
                            <Input style={{ width: "200px" }} className="py-2" value={projectDetel.projectName} />
                        </Form.Item>
                        <Form.Item
                            className="form-group"
                            name="categoryId"
                        >
                            <p>Project Category</p>
                            <select name='categoryId'
                                className='form-control' style={{ width: "200px" }}
                                value={arrcategory && arrcategory.length >= 2 ? arrcategory[getIndexCategory(projectDetel)].id : undefined}
                            >
                                {arrcategory?.map((item, index) => {
                                    return <option value={item.id} key={index}>
                                        {item.projectCategoryName}
                                    </option>
                                }
                                )}
                            </select>
                        </Form.Item>
                    </div>
                    {/* <div className="form-group mt-12">
                            <p>Name</p>
                            <input
                                onChange={handelChange}
                                className='form-control'
                                name='projectName'
                            />
                        </div> */}
                    <>

                        <p style={{ fontWeight: "700" }}>Description</p>

                        <Editor
                            onInit={(editor) => editorRef.current = editor}
                            initialValue={projectDetel.description}
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar: 'undo redo | formatselect | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}

                        />
                        <Form.Item
                            name="description"
                        >
                        </Form.Item>
                    </>
                </Form>
            </Modal>
        </div >
    );
};
