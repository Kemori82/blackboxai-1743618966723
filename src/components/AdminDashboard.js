import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, contentRes] = await Promise.all([
          axios.get('/api/admin/users'),
          axios.get('/api/content/home')
        ]);
        setUsers(usersRes.data);
        setContent(contentRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Users Section */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Users ({users.length})</h2>
          <div className="space-y-2">
            {users.map(user => (
              <div key={user._id} className="flex justify-between items-center p-2 border-b">
                <div>
                  <p className="font-medium">{user.username}</p>
                  <p className="text-sm text-gray-500">{user.role}</p>
                </div>
                <Link 
                  to={`/admin/users/${user._id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Content</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Home Page</h3>
              <p className="text-sm text-gray-500">
                Last updated: {new Date(content.metadata?.lastUpdated).toLocaleString()}
              </p>
            </div>
            <Link
              to="/admin/content/edit/home"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit Content
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;