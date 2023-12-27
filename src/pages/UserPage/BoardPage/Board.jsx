import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { CommentService, TimeTracking, projectService, task } from '../../../services/service';
import { Input, Modal, Form, Select, InputNumber, Slider, Button, Avatar, Collapse, Tag, Table, Dropdown, Popconfirm } from 'antd';
import { Option } from 'antd/es/mentions';
import toast from 'react-hot-toast';
import { PropagateLoader } from 'react-spinners';

export default function Board() {
    var projectId = useSelector((state) => state.userReducer.projectID);
    const [project, setproject] = useState([])
    const [allMember, setAllMember] = useState([])
    const [taskStatus, setTaskStatus] = useState([])
    const [taskType, setTaskType] = useState([])
    const [taskPriority, setTaskPriority] = useState([])
    const [form] = Form.useForm();
    const [originalEstimate, setOriginalEstimate] = useState(null);
    const [maxHoursSpent, setMaxHoursSpent] = useState(0); // Số giờ tối đa cho Hours spent
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [taskEdit, setTaskEdit] = useState([])
    let info = useSelector((state) => state.userReducer.info);
    const [listComment, setListComment] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [selectedValues, setSelectedValues] = useState([]);
    const [estimateTime, setEstimateTime] = useState("0");
    const [spentTime, setSpentTime] = useState("0");
    const [remainingTime, setRemainingTime] = useState(0);
    console.log("🚀 ~ file: Board.jsx:28 ~ Board ~ remainingTime:", remainingTime)
    const [priorityEdit, setPriorityEdit] = useState({})

    const handleChange = (selected) => {
        const updatedSelectedValues = selected.length === 0 ? [] : [...new Set([...selectedValues, ...selected])];
        const membersToAssign = selected.length === 0 ? [] : project?.members.filter(member => selected?.includes(member.userId));
        setSelectedValues(updatedSelectedValues);

        const updateTa = {
            ...taskEdit,
            listUserAsign: selected,
            priorityId: taskEdit.priorityTask.priorityId,
            typeId: taskEdit.typeId,
            lstComment: listComment,
            assigness: membersToAssign,
        }

        task.updateTask(updateTa)
            .then((res) => {
                projectService
                    .getProjectDetail(projectId)
                    .then((res) => {
                        setproject(res.data.content);
                        toast.success("Update Success")
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (!projectId) {
            let userJson = localStorage.getItem("PROJECT_ID");
            let id = JSON.parse(userJson);
            projectId = id
        } else {
            projectService
                .getProjectDetail(projectId)
                .then((res) => {
                    setproject(res.data.content);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        task
            .getStatus()
            .then((res) => {
                setTaskStatus(res.data.content);
            })
            .catch((err) => {
                console.log(err);
            })
        task
            .getTaskType()
            .then((res) => {
                setTaskType(res.data.content);
            })
            .catch((err) => {
                console.log(err);
            })
        task
            .getPriority()
            .then((res) => {
                setTaskPriority(res.data.content);
            })
            .catch((err) => {
                console.log(err);
            })
        task
            .getMember()
            .then((res) => {
                setAllMember(res.data.content);
                setSearchMember(res.data.content)
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
    const showModalAdd = () => {
        setIsModalOpenAdd(true);
    };
    const handleCancelAdd = () => {
        setIsModalOpenAdd(false);
    };

    const [typeId, setTypeId] = useState(1)
    const [priority, setPriority] = useState(1)

    const handleTypeChange = (value) => {
        setTypeId(parseInt(value, 10))
    };
    const handlePriorityChange = (value) => {
        setPriority(parseInt(value, 10) + 1)
    };

    const [searchMember, setSearchMember] = useState([])
    const onChangeSearchMember = (e) => {
        setIsLoading(true);

        // Tìm kiếm trong mảng allMember dựa trên tên
        const filteredMembers = allMember.filter(member =>
            member.name.toLowerCase().includes(e.target.value.toLowerCase())
        );

        setTimeout(() => {
            if (filteredMembers.length === 0) {
                setSearchMember("");
            } else {
                setSearchMember(filteredMembers);
            }
            setIsLoading(false);
        }, 500); // 500ms mô phỏng việc tìm kiếm
    };
    const [comment, setComment] = useState([])

    const onChangeComent = (e) => {
        setComment(e?.target.value)
    }
    const [detailLocalTask, setDetailLocalTask] = useState([])

    const handelComent = () => {
        let found = false;
        let vlComment = {}
        vlComment = {
            ...vlComment,
            taskId: taskEdit?.taskId,
            contentComment: comment
        };
        CommentService
            .postInsertComment(vlComment)
            .then((res) => {
                projectService
                    .getProjectDetail(projectId)
                    .then((res) => {
                        console.log("🚀🚀🚀 res:", res.data.content)
                        res.data.content.lstTask.some((item) => {
                            if (found) return true;
                            if (item.statusId === detailLocalTask.statusId) {
                                return item.lstTaskDeTail.some((listdetail) => { // Sử dụng some thay vì map để dừng ngay khi tìm thấy
                                    if (listdetail.taskId === detailLocalTask.taskId) {
                                        setListComment(listdetail.lstComment);
                                        found = true; // true khi tìm thấy
                                        return true; // Dừng vòng lặp
                                    }
                                    return false;
                                });
                            }
                            return false;
                        });
                        toast.success("Comment Success")
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const onFinish = (values) => {
        if (values.statusId === "3") values.statusId = "4"
        if (values.statusId === "2") values.statusId = "3"
        if (values.statusId === "1") values.statusId = "2"
        if (values.statusId === "0") values.statusId = "1"
        if (values.statusId === undefined) {
            values.statusId = "1"
        }
        const updatedValues = {
            ...values,
            projectId: project.id,
            typeId: typeId,
            priorityId: priority,
            timeTrackingRemaining: values.originalEstimate - values.timeTrackingSpent,
        }

        task
            .createTask(updatedValues)
            .then((res) => {
                toast.success("Create Task Success");
                projectService
                    .getProjectDetail(projectId)
                    .then((res) => {
                        setproject(res.data.content);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                setIsModalOpen(false);
            })
            .catch((err) => {
                console.log(err);
            })

    };
    const handleOriginalEstimateChange = (value) => {
        setOriginalEstimate(value);
    };

    useEffect(() => {
        if (originalEstimate !== null) {
            setMaxHoursSpent(originalEstimate);
        }
    }, [originalEstimate]);
    const handelAddMember = (UserId) => {
        let member = {}; // Khởi tạo đối tượng assign
        member = {
            ...member,
            projectId: project?.id,
            userId: UserId
        };
        task
            .postAssignUserProject(member)
            .then((res) => {
                projectService
                    .getProjectDetail(projectId)
                    .then((res) => {
                        setproject(res.data.content);
                        toast.success("Add Member Success");

                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                toast.error("User already exists in the project!");
                console.log(err);
            });
    }
    // handel remove member trong task
    const handelDeleteMember = (UserId) => {
        let member = {}; // Khởi tạo đối tượng assign
        member = {
            ...member,
            projectId: project?.id,
            userId: UserId
        };
        task
            .postremoveUserFromProject(member)
            .then((res) => {
                projectService
                    .getProjectDetail(projectId)
                    .then((res) => {
                        setproject(res.data.content);
                        toast.success("Delete Member Success");

                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    // handel remove task
    const confirm = (e) => {
        console.log(taskEdit?.taskId)
        task
            .removeTask(taskEdit?.taskId)
            .then((res) => {
                projectService
                    .getProjectDetail(projectId)
                    .then((res) => {
                        setproject(res.data.content);
                        toast.success('Remove Task Success');
                        setIsModalVisible(false);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const cancel = (e) => {
        console.log(e);
        toast.error('Click on No');
    };
    const handelUpdateDes = () => {
        if (taskEdit.statusId === "3") taskEdit.statusId = "4"
        if (taskEdit.statusId === "2") taskEdit.statusId = "3"
        if (taskEdit.statusId === "1") taskEdit.statusId = "2"
        if (taskEdit.statusId === "0") taskEdit.statusId = "1"
        if (taskEdit.statusId === undefined) {
            taskEdit.statusId = "1"
        }
        const updateDescription = {
            taskId: taskEdit.taskId,
            description: taskEdit.description,
        }
        console.log("🚀~ taskEdit:", taskEdit)
        const isIdPresent = taskEdit.assigness.some(assignee => assignee.id === info.id);
        if (isIdPresent) {
            task
                .updateDescription(updateDescription)
                .then((res) => {
                    console.log("🚀 ~ res:", res)
                    toast.success('Update Description Success');
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            toast.error('Are you an assignee of this task?');
        }
    }

    const renderModalCreate = () => {
        return <>
            <Modal footer={null}
                title="Create Task" open={isModalOpen} onCancel={handleCancel}>
                <div style={{ borderBottom: '1px solid #ccc', }}>   </div>
                <div className="mt-3">
                    <Form className='contaienr' onFinish={onFinish} form={form} >
                        <p>Project Name</p>
                        <Form.Item  >
                            <Input value={project.projectName} disabled={true} />
                        </Form.Item>
                        <p className="red-star">Task name</p>

                        <Form.Item
                            rules={[
                                {
                                    required: true, message: 'Please input Task Name'
                                }
                            ]}
                            name="taskName"
                        >
                            <Input />
                        </Form.Item>
                        <p>Status</p>
                        <Form.Item name="statusId" >
                            <Select
                                defaultValue={taskStatus[0]?.statusName}
                            >
                                {taskStatus?.map((item, index) => (
                                    <Select.Option value={item.id} key={index}>
                                        {item.statusName}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <div className="flex justify-between">
                            <span style={{ width: "45%" }}>
                                <Form.Item >
                                    <p>Priority</p>
                                    <Select
                                        onChange={handlePriorityChange}
                                        defaultValue={taskPriority[0]?.priority}
                                    >
                                        {taskPriority?.map((item, index) => {
                                            return <Select.Option value={item.id} key={index}>{item.priority}</Select.Option>
                                        })}
                                    </Select>
                                </Form.Item>
                            </span>
                            <span style={{ width: "49%" }}>
                                <Form.Item>
                                    <p>Task Type</p>
                                    <Select
                                        onChange={handleTypeChange}
                                        defaultValue={taskType[0]?.taskType}

                                    >
                                        {taskType?.map((item, index) => {
                                            return <Select.Option value={item.id} key={index}>{item.taskType}</Select.Option>
                                        })}
                                    </Select>
                                </Form.Item>
                            </span>
                        </div>
                        <p className="red-star">Assigners</p>
                        <Form.Item
                            rules={[
                                {
                                    required: true, message: 'Please input Assigners'
                                }
                            ]}
                            name="listUserAsign"
                        >
                            <Select
                                style={{
                                    width: 200,
                                }}
                                mode="multiple"
                                placeholder="Please select Assigners"
                            >
                                {project?.members?.map((member, index) => {
                                    return (
                                        <Option value={member.userId} key={index}>
                                            {member.name}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                        <p>Time tracker</p>
                        <div className="flex justify-around">
                            <div style={{ width: "30%" }} >
                                <p className="red-star">original Estimate</p>
                                <Form.Item rules={[
                                    {
                                        required: true, message: 'Please input Estimated Hours'
                                    }
                                ]}
                                    name="originalEstimate"
                                >
                                    <InputNumber min={0} onChange={handleOriginalEstimateChange} />
                                </Form.Item>
                            </div>
                            <div style={{ width: "50%" }} className="">
                                <p className="red-star">Hours spent</p>
                                <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input Hours spent'
                                        }
                                    ]}
                                    name="timeTrackingSpent"
                                >
                                    <Slider min={0} max={maxHoursSpent} />
                                </Form.Item>
                            </div>

                        </div>


                        <p className="red-star">Description</p>
                        <Form.Item
                            rules={[{ required: true, message: 'Please input Description' }]}
                            name="description"
                        >
                            <Input.TextArea showCount maxLength={100} />
                        </Form.Item>

                        <div className="w-full text-center" >
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className='text-white' style={{ backgroundColor: "#001529" }} >
                                    Submit
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </Modal >
        </>
    }
    const renderModalAdd = () => {
        return <Modal
            open={isModalOpenAdd}
            title="Add Member"
            onCancel={handleCancelAdd}
            footer={null}
            width={700}
        >
            <div style={{ borderBottom: '1px solid #ccc', }}>   </div>

            <div className="flex mt-2">
                <div className="mr-5" style={{ width: "50%" }}>
                    <Input placeholder='Search Member...' className='mt-2' onChange={onChangeSearchMember} />
                    <p>Not yet added</p>
                    <div className="" style={{ overflow: "hidden scroll", height: "400px" }}>
                        {isLoading ? (
                            <div className="text-center mt-10 mr-4">
                                <PropagateLoader color="#001529" size={20} />
                            </div>
                        ) : (
                            searchMember && searchMember.length > 0 ? (
                                searchMember.map((member, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <Avatar
                                                    src={member.avatar}
                                                />
                                                <div className="grid ml-2">
                                                    {member.name}
                                                    <p>User ID: {member.userId}</p>
                                                </div>
                                            </div>
                                            <Button
                                                onClick={() => {
                                                    handelAddMember(member.userId)
                                                }
                                                }
                                                type="primary" style={{ backgroundColor: "#001529", color: "white" }} >Add</Button>
                                        </div>
                                        <div style={{ borderBottom: '1px solid #ccc' }}></div>
                                    </div>
                                ))
                            ) : (
                                <div>No Data</div>
                            )
                        )}
                    </div>
                </div>
                <div className="mt-10" style={{ width: "50%" }}>
                    Already in project
                    <div className="" style={{ overflow: "hidden scroll", height: "400px" }}>
                        {project?.members?.map((mpron, index) => {
                            return <>
                                <div className="">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <Avatar
                                                key={index}
                                                src={mpron.avatar}
                                            />
                                            <div className="grid ml-2">
                                                {mpron.name}
                                                <p>User ID: {mpron.userId}</p>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={() => {
                                                handelDeleteMember(mpron.userId)
                                            }
                                            }
                                            type="primary" danger  >DELETE</Button>
                                    </div>
                                    <div style={{ borderBottom: '1px solid #ccc', }}>
                                    </div>
                                </div>
                            </>
                        }
                        )}
                    </div>
                </div>
            </div>
        </Modal>

    }
    const ShowModalTask = (item, Item) => {
        console.log("🚀 ~ file: Board.jsx:649 ~ ShowModalTask ~ item:", item)
        projectService
            .getProjectDetail(projectId)
            .then((res) => {
                setproject(res.data.content);

            })
            .catch((err) => {
                console.log(err);
            });
        setListComment(item.lstComment)
        setDetailLocalTask({
            statusId: Item.statusId,
            taskId: item.taskId
        })
        setTaskEdit({
            ...item,
            priorityId: item.priorityTask.priorityId,
            typeId: item.taskTypeDetail.id,
        });
        setEstimateTime(item.originalEstimate)
        setSpentTime(item.timeTrackingSpent)
        setRemainingTime(item.originalEstimate - item.timeTrackingSpent)
        setPriorityEdit(item.priorityTask)
        setIsModalVisible(true);
        console.log("🚀 🚀 🚀🚀 🚀 🚀  ~ true:", item)
        let a = item?.assigness?.map(assign => assign.id)
        setSelectedValues(a)

    };
    const items_Collapse = [
        {
            key: '1',
            label: 'Task Info',
            children: <>
                <span className='flex'>
                    Task Name:
                    <p className='ml-1' style={{ fontWeight: "500" }}>{taskEdit?.taskName}</p>
                </span>
                <span className='flex'>
                    Type:
                    <p className='ml-1' style={{ fontWeight: "500" }}>{taskEdit?.taskTypeDetail?.taskType}</p>
                </span>
                <span className='grid'>
                    Assignees:
                    <div className="">
                        <div className="">
                            <Form.Item>
                                <Select
                                    mode="multiple"
                                    value={selectedValues}
                                    onChange={(newValue) => {
                                        handleChange(newValue)
                                        setSelectedValues(newValue)
                                    }
                                    } // Khi có sự thay đổi, cập nhật state
                                >
                                    {project?.members?.map((member, index) => (
                                        <Option value={member.userId} key={index}>
                                            {member.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>

                    </div>
                </span>
            </>
        },
        {
            key: '2',
            label: 'Details',
            children: <>
                <span className='flex justify-between m-auto'>
                    <p className='m-2'>Priority</p>
                    <Form.Item style={{ width: "100px" }}>
                        <Select
                            onChange={(newValue) => {
                                onChangePriority(newValue)
                                setPriorityEdit(newValue)
                            }}
                            value={priorityEdit.priority}
                        >
                            {taskPriority?.map((item, index) => {
                                return <Select.Option value={item.id} key={index}>{item.priority}</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                </span>

                <div style={{ borderBottom: '2px solid #ccc', }}>   </div>
                <p className='text-center'>Time Tracking</p>
                <p className='text-center'>(Hour)</p>
                <span className='flex justify-between'>
                    <div className="">
                        Estimate Time
                        <p className='ml-1' style={{ fontWeight: "500" }}>
                            <Form.Item >
                                <InputNumber
                                    min={spentTime}
                                    onChange={(newValue) => {
                                        onChangeEstimateTime(newValue)
                                        setEstimateTime(newValue)
                                    }}
                                    value={estimateTime}
                                />
                            </Form.Item>
                        </p>
                    </div>
                    <div className="">
                        Time Spent
                        <p className='ml-1' style={{ fontWeight: "500" }}>
                            <Form.Item >
                                <InputNumber
                                    min={0}
                                    max={estimateTime}
                                    onChange={(newValue) => {
                                        onChangeSpentTime(newValue)
                                        setSpentTime(newValue)
                                    }}
                                    value={spentTime} />
                            </Form.Item>
                        </p>
                    </div>
                </span>

                <span className='gird'>
                    Time Remaining
                    <p className='ml-1' style={{ fontWeight: "500" }}>
                        <div className=" ">
                            <div className="flex justify-between">
                                <p>MIN</p>
                                <p>Remaining</p>
                                <p>MAX</p>
                            </div>
                            <div className="flex justify-between">
                                <p className='ml-2'>0</p>
                                <p>{estimateTime - spentTime}</p>
                                <p className='mr-2'>{estimateTime}</p>
                            </div>
                        </div>
                        < Slider
                            min={0}
                            max={estimateTime}
                            value={estimateTime - spentTime}
                            disabled
                        />

                    </p>
                </span>

            </>
        },
    ];
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

    ];
    const dropdownMenu = (record) => (
        <div className='text-center' style={{ height: "400px", width: "450px", backgroundColor: "white", border: "1px solid gray", borderRadius: "5%" }}>
            <p className='m-3' style={{ fontWeight: "500", fontSize: "22px" }}>Members</p>
            <Table dataSource={record} columns={columnsMembers}
                pagination={{
                    pageSize: 4,
                    total: record?.length,
                }} />
        </div>
    );
    const onChangeEstimateTime = (ETime) => {
        let ET = {
            originalEstimate: ETime,
            taskId: taskEdit.taskId
        }
        TimeTracking
            .updateEstimate(ET)
            .then((res) => {
                projectService
                    .getProjectDetail(projectId)
                    .then((res) => {
                        setproject(res.data.content);
                        toast.success("Update task successfully!")
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                toast.error("Update Fail! \n User is not assign!")
                console.log(err);
            });
    }
    const onChangeSpentTime = (STime) => {
        let ST = {
            originalEstimate: STime,
            taskId: taskEdit.taskId
        }
        TimeTracking
            .updateTimeTracking(ST)
            .then((res) => {
                projectService
                    .getProjectDetail(projectId)
                    .then((res) => {
                        setproject(res.data.content);
                        toast.success("Update task successfully!")
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                toast.error("Update Fail! \n User is not assign!")
                console.log(err);
            });
    }

    const onChangePriority = (Pri) => {
        let propritiUpdate = {
            priorityId: parseInt(Pri) + 1,
            taskId: taskEdit.taskId,
        }
        task
            .updatePriority(propritiUpdate)
            .then((res) => {
                projectService
                    .getProjectDetail(projectId)
                    .then((res) => {
                        setproject(res.data.content);
                        toast.success("Update task successfully!")
                    })
                    .catch((err) => {
                        toast.error(err.response.data.content);
                    });
            })
            .catch((err) => {
                toast.error(err.response.data.content);

            });
    }
    return (
        <div className='m-5'
            style={{ width: "100%" }}
        >
            <h3 style={{ fontWeight: "700", fontSize: "28px", }}>Board Project :{project.projectName}</h3>
            {renderModalCreate()}
            {renderModalAdd()}

            <div className="flex justify-start">
                <Button onClick={showModal} className='mr-4' style={{
                    backgroundColor: "#001529", color: "white",
                }}>Create Task</Button>
                <Button onClick={showModalAdd} className='mr-4' style={{
                    backgroundColor: "#001529", color: "white",
                }}>Add member</Button>

                <Dropdown overlay={dropdownMenu(project?.members)} placement="bottom" >
                    <div className="flex">
                        {project?.members?.map((item) => {
                            return (
                                <span key={item.id} color="red" className="inline-flex">
                                    <img src={item.avatar} alt="avatar" style={{ borderRadius: "50%", width: '30px', height: '30px' }} />
                                </span>
                            );
                        })}
                    </div>
                </Dropdown>
            </div >

            < div className="container flex justify-between Task" >
                {project?.lstTask?.map((item, index) => (
                    <div className="Ta" key={index}>
                        <div className="Task_Box">
                            <div className="Task_Status">
                                <p>{item.statusName}</p>
                            </div>
                            {item.lstTaskDeTail ? (
                                item.lstTaskDeTail.map((itemDetail, indexDetail) => (
                                    <div onClick={() => ShowModalTask(itemDetail, item)} className="Task_content text-red-950" key={indexDetail}>
                                        <div className="flex justify-between" style={{ width: '100%' }}>
                                            <div className="m-2 "  >
                                                <div className='mb-1'>{itemDetail.taskName && itemDetail.taskName.length > 6 ? `${itemDetail.taskName.substring(0, 6)}...` : itemDetail.taskName}</div>
                                                <Tag color="red">{itemDetail.priorityTask.priority}</Tag>
                                            </div>
                                            <div className="m-2" style={{ width: '50%' }}>
                                                <div className='mb-1'>{itemDetail.taskTypeDetail.taskType}</div>
                                                <div className="flex">
                                                    {itemDetail.assigness.slice(0, 2).map((assigness, index) => (
                                                        <Avatar
                                                            key={index}
                                                            src={assigness.avatar}
                                                            style={{
                                                                marginRight: '-10px',
                                                                border: '2px solid white'
                                                            }}
                                                        />
                                                    ))}
                                                    {itemDetail.assigness.length > 2 && (
                                                        <Avatar style={{
                                                            textAlign: "center", marginLeft: '5px', backgroundColor: 'gray', color: 'white'
                                                            , border: '1px solid white'
                                                        }}>
                                                            +{itemDetail.assigness.length - 2}
                                                        </Avatar>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))
                            ) : (
                                <div>No tasks available for this status.</div>
                            )}
                        </div>
                    </div>
                ))}
            </div >
            <Modal width="800px" footer={null} visible={isModalVisible} onCancel={() => setIsModalVisible(false)}>
                <div className="flex justify-end mr-10 mb-2">
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button>Remove Task</Button>
                    </Popconfirm>


                </div>
                <div style={{ borderBottom: '1px solid #ccc', }}></div>
                <div className="flex mt-2">
                    <div style={{ width: "50%" }}>
                        <p>Comment</p>
                        <Form.Item style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="" style={{ display: 'flex', alignItems: 'center', width: "100%" }}>
                                <Avatar src={info.avatar} style={{ marginRight: '16px' }} />
                                <Input.TextArea
                                    onChange={onChangeComent}
                                    showCount
                                    placeholder='Please input Comment here...'
                                    maxLength={100}
                                    style={{ flex: 1, width: "1001px" }}
                                />
                            </div>
                        </Form.Item>
                        <Button onClick={() => {
                            handelComent()
                        }
                        } type="primary" value="default">Add Comment</Button>
                        <div className="comment_list" style={{ overflow: "hidden scroll", height: "400px" }}>
                            {listComment?.map((cm) => {
                                return <div className='w-full list_item_comment' >
                                    <div className="flex flex-col">
                                        <div className="">
                                            <Avatar className='m-1' src={cm.avatar} style={{ marginRight: '16px' }} />
                                            <span className='' style={{ fontWeight: "500" }}>{cm.name}</span>
                                        </div>
                                        <div className="item_comment ml-10" >
                                            <p>{cm.commentContent}</p>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                    <div style={{ width: "50%" }}>
                        <div className="" style={{ marginLeft: "10%" }}>
                            <p >Description</p>
                            <Form.Item>
                                <Input.TextArea
                                    value={taskEdit.description}
                                    onChange={(e) => setTaskEdit(prevState => ({ ...prevState, description: e.target.value }))}
                                    showCount
                                    maxLength={100}
                                />
                            </Form.Item>
                            <Button onClick={() => {
                                handelUpdateDes()
                            }
                            } >Save</Button>
                            <div >
                                <p>Status</p>
                                <Form.Item name="statusId">
                                    <Select defaultValue={
                                        taskStatus?.some(statusItem => statusItem.statusId === taskEdit.statusId)
                                            ? taskEdit?.statusId
                                            : taskStatus[0]?.statusId
                                    }
                                        onChange={(selectedStatusId) => {
                                            let Statusupdate = {
                                                statusId: selectedStatusId,
                                                taskId: taskEdit.taskId
                                            }
                                            task
                                                .updateStatus(Statusupdate)
                                                .then((res) => {
                                                    projectService
                                                        .getProjectDetail(projectId)
                                                        .then((res) => {
                                                            setproject(res.data.content);
                                                            toast.success("Update Status Success")
                                                        })
                                                        .catch((err) => {
                                                            console.log(err);
                                                        });
                                                })
                                                .catch((err) => {
                                                    console.log(err);
                                                })
                                        }}>
                                        {taskStatus?.map((item, index) => (
                                            <Select.Option value={item.statusId} key={index}>
                                                {item.statusName}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>

                            <Collapse
                                items={items_Collapse} />
                        </div>
                    </div>


                </div>
            </Modal >
        </div >
    )
}
