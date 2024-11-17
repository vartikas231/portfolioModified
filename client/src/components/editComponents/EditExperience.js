import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditExperience = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [experience, setExperience] = useState({
        role: "",
        company: "",
        duration: "",
        description: "",
        skillsUsed: "",
        achievements: ""
    });
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const response = await axios.get(`http://localhost:2000/experience/${id}`);
                const data = response.data;
                setExperience({
                    ...data,
                    skillsUsed: Array.isArray(data.skillsUsed) 
                        ? data.skillsUsed.join(', ') 
                        : data.skillsUsed,
                    achievements: Array.isArray(data.achievements) 
                        ? data.achievements.join('\n') 
                        : data.achievements
                });
            } catch (error) {
                console.error("Error fetching experience:", error);
                setError("Failed to fetch experience details");
            }
        };

        fetchExperience();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExperience(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updateData = {
                ...experience,
                skillsUsed: experience.skillsUsed.split(',').map(skill => skill.trim()),
                achievements: experience.achievements.split('\n').filter(item => item.trim() !== '')
            };

            const response = await axios.put(`http://localhost:2000/experience/${id}`, updateData);
            
            if (response.data) {
                navigate('/experiences-admin'); // Redirect after successful update
            }
        } catch (error) {
            console.error("Error updating experience:", error);
            setError("Failed to update experience");
        }
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="admin-experience-container">
            <div className="admin-experience-form">
                <form onSubmit={handleSubmit}>
                    <h4 className="form-title">Edit Experience</h4>
                    <input
                        type="text"
                        name="role"
                        value={experience.role}
                        onChange={handleChange}
                        placeholder="Role"
                        required
                    />
                    <input
                        type="text"
                        name="company"
                        value={experience.company}
                        onChange={handleChange}
                        placeholder="Company"
                        required
                    />
                    <input
                        type="text"
                        name="duration"
                        value={experience.duration}
                        onChange={handleChange}
                        placeholder="Duration"
                        required
                    />
                    <textarea
                        name="description"
                        value={experience.description}
                        onChange={handleChange}
                        placeholder="Description"
                        required
                    />
                    <input
                        type="text"
                        name="skillsUsed"
                        value={experience.skillsUsed}
                        onChange={handleChange}
                        placeholder="Skills Used (comma-separated)"
                    />
                    <textarea
                        name="achievements"
                        value={experience.achievements}
                        onChange={handleChange}
                        placeholder="Achievements (one per line)"
                    />
                    <button type="submit">Update Experience</button>
                </form>
            </div>
        </div>
    );
};

export default EditExperience;