import { Editor } from '@tinymce/tinymce-react';
import { Form, Input, Layout } from "antd";
import React, { useEffect, useRef, useState } from 'react'
import { projectService, userService } from '../../../services/service';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CREATE_PROJECT, GET_PROJECT, LOADING } from '../../../redux/constant/user';

export default function CreateTablet() {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let info = useSelector((state) => state.userReducer.info);
    console.log("🚀 ~ file: Create.jsx:14 ~ Create ~ info:", info.id)

    const createProject = useSelector((state) => state.userReducer.createProject);

    const editorRef = useRef(null);
    const [arrcategory, setArrCategory] = useState();
    useEffect(() => {
        userService
            .getProjectCategory()
            .then((res) => {
                setArrCategory(res.data.content);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handelEditorChange = (content) => {
        console.log("content:", content)
        createProject.description = content;
    }

    const handelChangeCategory = (event) => {
        createProject.categoryId = event.target.value
    };
    const handelChange = (event) => {
        console.log("handelChange:", event.target.value)
        return createProject.projectName = event.target.value;
    }

    const onFinish = (values) => {

        console.log("🚀createProject:", createProject)
        let newPro = {
            ...createProject,
            members: info,
        }

        console.log("🚀 ~ newPro:", newPro)
        projectService
            .postCreateProject(newPro)
            .then((res) => {
                res.data.content.creator = info.id
                dispatch({ type: CREATE_PROJECT, payload: res.data.content });
                localStorage.setItem("PROJECT", JSON.stringify(res.data.content));
                dispatch({ type: LOADING, payload: true });
                userService
                    .getListAllProject()
                    .then((res) => {
                        localStorage.setItem("USER_PROJECT", JSON.stringify(res.data.content.filter(project => project.creator.id === info.id)));
                        localStorage.setItem("ALL_PROJECT", JSON.stringify(res.data.content));
                        dispatch({ type: LOADING, payload: true });
                        dispatch({ type: GET_PROJECT, payload: res.data.content });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                toast.success("Tạo Project Thành Công");
                navigate("/user/Management");
            })
            .catch((err) => {
                toast.error("Project name already exists");
                console.log(err.content);
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
        console.log(createProject)
    };
    return (
        <div className='w-full gird mt-16'>
            <div className="">
                <h3 style={{ fontWeight: "700", fontSize: "28px" }}>Create Project</h3>
            </div>
            <div className="flex justify-center mr-5">
                <div className="" >
                    <Layout>
                        <content>
                            <Form
                                className='container'
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                <p>Name</p>
                                <Form.Item
                                    name="projectName"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your Name Project!",
                                        },
                                    ]}
                                >
                                    <Input placeholder='Input Name...' className="py-2" onChange={handelChange} />
                                </Form.Item>
                                {/* <div className="form-group mt-12">
                            <p>Name</p>
                            <input
                                onChange={handelChange}
                                className='form-control'
                                name='projectName'
                            />
                        </div> */}
                                <>

                                    <p>Description</p>
                                    <Editor
                                        onInit={(editor) => editorRef.current = editor}
                                        initialValue=""
                                        init={{
                                            height: 400,
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
                                </>

                                <Form.Item
                                    className="form-group"
                                    name="categoryId"
                                >
                                    <p>Category</p>
                                    <select
                                        name='categoryId' className='form-control' onChange={(e) => handelChangeCategory(e)}>
                                        {arrcategory?.map((item, index) => (
                                            <option value={item.id} key={index}>{item.projectCategoryName}</option>
                                        ))}
                                    </select>
                                </Form.Item>
                                <button className="button btn btn-outline-primary" type='submit'>Create Project</button >
                            </Form>
                        </content>

                    </Layout>
                </div>
            </div>
        </div >
    )

}
