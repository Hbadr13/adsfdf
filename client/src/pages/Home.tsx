import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Navigate to the desired route when the component mounts
        navigate('/list/1-hundred-names');
    }, [navigate]); // Ensure that the navigate function is included in the dependency array

    return (
        <div>
            {/* You can add content here if necessary */}
        </div>
    );
}

export default Home;
