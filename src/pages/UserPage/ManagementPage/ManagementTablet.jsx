import React, { useEffect, useRef, useState } from 'react';
import { Table, Tag, Modal, Form, Input, Dropdown, Popconfirm, } from 'antd';
import { projectService, task, userService } from '../../../services/service';
import { DeleteOutlined, EditOutlined, } from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_PROJECT, DETAIL_PROJECT, GET_CATEGOGY, GET_PROJECT, LOADING, UPDATE_PROJECT } from '../../../redux/constant/user';
import { PropagateLoader } from 'react-spinners';
import { NavLink } from 'react-router-dom';

export default function ManagementTablet() {
    let dispatch = useDispatch();
    const editorRef = useRef(null);
    const [filteredInfo, setFilteredInfo] = useState({})
    const [sortedInfo, setSortedInfo] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedProjectId, setSelectedProjectId] = useState(null)
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    let info = useSelector((state) => state.userReducer.info);
    const updateProject = useSelector((state) => state.userReducer.updateProject);
    const arrProject = useSelector((state) => state.userReducer.userProject);
    const arrcategory = useSelector((state) => state.userReducer.category);
    const projectDetail = useSelector((state) => state.userReducer.detailProject);
    const isLoading = useSelector((state) => state.userReducer.loading)

    useEffect(() => {
        userService
            .getProjectCategory()
            .then((res) => {
                dispatch({ type: GET_CATEGOGY, payload: res.data.content });
            })
            .catch((err) => {
                console.log(err);
            });
        let idProToAddAssign = JSON.parse(localStorage.getItem("PROJECT"))
        console.log("🚀 ~ file: Management.jsx:30 ~ Management ~ idProToAddAssign:", idProToAddAssign)
        let member = {};
        member = {
            ...member,
            projectId: idProToAddAssign?.id,
            userId: info.id
        };
        console.log("🚀 ~ file: Management.jsx:33 ~ Management ~ member:", member)
        task
            .postAssignUserProject(member)
            .catch((err) => {
            });
    }, []);


    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };
    const handleAddMember = (record) => {
        console.log('Adding member for:', record);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const dropdownMenu = (record) => (
        <div className='text-center' style={{ width: "450px", backgroundColor: "white", border: "1px solid gray", borderRadius: "5%" }}>
            <p style={{ fontWeight: "500" }}>Members</p>
            <Table dataSource={record} columns={columnsMembers}
                pagination={{
                    pageSize: 4,
                    total: record.length,
                }} />
        </div>
    );

    const columnsMembers = [
        {
            title: 'ID',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar) => <img src={avatar} alt="avatar" style={{ borderRadius: "50%", width: '30px', height: '30px' }} />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     // render: (text, record) => (
        //     //     <Button
        //     //         style={{ color: "red" }}
        //     //         type="link"
        //     //         icon={<DeleteOutlined />}
        //     //     // onClick={() => handleDelete(record.id)}
        //     //     >
        //     //         Delete
        //     //     </Button>
        //     // ),
        // },
    ];

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            // render: (record) =>
            //     setIdd(record)
            // ,
            filteredValue: filteredInfo.id || null,
            onFilter: (value, record) => record.id === parseInt(value, 10),
            sorter: (a, b) => a.id - b.id,
            sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,
            ellipsis: true,
            width: 80,
        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
            width: 150,
            render: (text, record) => {
                const handleTagClick = () => {
                    dispatch({ type: 'PUSH_PROJECT_ID', payload: record.id });
                    localStorage.setItem("PROJECT_ID", JSON.stringify(record.id));
                };
                return (
                    <NavLink
                        onClick={handleTagClick}
                        to={{
                            pathname: '/user/Board', // Đường dẫn bạn muốn chuyển hướng đến
                        }}
                    >
                        <Tag color="green">{record.projectName}</Tag>
                    </NavLink>
                );
            }
            ,
            filteredValue: filteredInfo.projectName || null,
            onFilter: (value, record) => record.projectName.includes(value),
            sorter: (a, b) => a.projectName.length - b.projectName.length,
            sortOrder: sortedInfo.columnKey === 'projectName' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Action',
            fixed: 'right',
            render: (record) => {
                return <div className="">
                    <button className='btn_active'
                        onClick={() => {
                            // projectService
                            //     .putUpdateProject()
                            // dispatch({ type: UPDATE_PROJECT, payload: record });
                            showModal(record.id)
                        }}
                    >
                        <Tag className='btn_active mr-2' color="#108ee9"><EditOutlined /></Tag>
                    </button>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => {
                            projectService
                                .deleteProject(record.id);
                            try {
                                dispatch({ type: DELETE_PROJECT, payload: record.id });
                                dispatch({ type: LOADING, payload: true });
                                setTimeout(() => {
                                    toast.success("Delete thành công");
                                    dispatch({ type: LOADING, payload: false });
                                }, "200");

                            } catch (error) {
                                console.error(error);
                            }
                        }}
                    >
                        <button className='btn_active'
                        >
                            <Tag className='btn_active ml-2' color="#FF0000"> <DeleteOutlined /></Tag>
                        </button>
                    </Popconfirm>
                </div>
            }
        },
    ];

    const handelChangeCategory = (e) => {
        const newValue = e.target.value;
        setSelectedCategoryId(newValue);
        updateProject.categoryId = newValue
    };

    const handelEditorChange = (content) => {
        updateProject.description = content
    }

    const handelChange = (event) => {
        updateProject.projectName = event.target.value

    }

    const getIndexCategory = () => {
        if (projectDetail && projectDetail.projectCategory) {
            const categoryIndex = arrcategory.findIndex(item => item.id === projectDetail.projectCategory.id);
            return categoryIndex >= 0 ? categoryIndex : 0;
        }
        return 0;
    };

    const handleOk = () => {
        projectService
            .putUpdateProject(selectedProjectId, updateProject)
            .then(res => {
                setTimeout(() => {
                    dispatch({ type: UPDATE_PROJECT, payload: res.data.content });
                }, "500");
                dispatch({ type: LOADING, payload: true });
                toast.success("Update thành công");
                userService
                    .getListAllProject()
                    .then((res) => {
                        localStorage.setItem("USER_PROJECT", JSON.stringify(res.data.content.filter(project => project.creator.id === info.id)));
                        localStorage.setItem("ALL_PROJECT", JSON.stringify(res.data.content));
                        setTimeout(() => {
                            dispatch({ type: GET_PROJECT, payload: res.data.content });
                        }, "500");
                        dispatch({ type: LOADING, payload: true });

                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((error) => {
                console.error('Error updating project:', error);
            });

        setIsModalOpen(false);
    };

    const showModal = (projectId) => {
        getIndexCategory();
        setSelectedProjectId(projectId);
        projectService
            .getProjectDetail(projectId)
            .then((res) => {
                const projectDetailData = res.data.content;
                updateProject.categoryId = projectDetail.projectCategory?.id
                updateProject.description = projectDetail.description
                updateProject.projectName = projectDetail.projectName
                dispatch({ type: DETAIL_PROJECT, payload: projectDetailData });
                setSelectedCategoryId(projectDetailData.projectCategory.id);
                setIsModalOpen(true);

            })
            .catch((err) => {
                console.log(err);
            });
    };

    const renderModal = () => {
        return <>
            <Modal width={window.innerWidth / 2} title="Edit Project" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    className='container'
                >
                    <div className="flex justify-between text-center " style={{ fontWeight: "700" }}>
                        <div className="">
                            <p>ID</p>
                            <Input style={{ width: "200px", color: '#000000	' }} className="py-2"
                                value={selectedProjectId}
                                disabled={true} />
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
                            <Input style={{ width: "200px" }} onChange={handelChange} className="py-2"
                                values={projectDetail?.projectName} placeholder={projectDetail?.projectName}
                            />
                        </Form.Item>
                        <Form.Item
                            className="form-group"
                            name="categoryId"
                        >
                            <p>Project Category</p>
                            <select
                                className='form-control'
                                style={{ width: "200px" }}
                                value={selectedCategoryId}
                                onChange={(e) => handelChangeCategory(e)}
                            >
                                {arrcategory?.map((item, index) => (
                                    <option value={item.id} key={index}>
                                        {item.projectCategoryName}
                                    </option>
                                ))}
                            </select>
                        </Form.Item>
                    </div>
                    <>
                        <p style={{ fontWeight: "700" }}>Description</p>

                        <Editor
                            onInit={(editor) => editorRef.current = editor}
                            initialValue={projectDetail.description}
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
                            onEditorChange={handelEditorChange}
                        />
                        <Form.Item
                            name="description"
                        >
                        </Form.Item>
                    </>
                </Form>
            </Modal>
        </>
    }
    return (
        <div className=' w-full mt-14' >
            <h3 style={{ fontWeight: "700", fontSize: "18px" }}>Project Management</h3>
            <div className='container'>

                {isLoading ? (<PropagateLoader color="#001529" size={20} />) : (
                    <Table
                        columns={columns}
                        dataSource={arrProject}
                        onChange={handleChange}
                        pagination={{
                            pageSize: 8,
                            total: arrProject?.length,
                        }}
                    />
                )}
            </div>
            <div style={{
                marginLeft: window.innerWidth / 2 - window.innerWidth / 6.2
            }}>
                {renderModal()}
            </div>
        </div >
    );
};
