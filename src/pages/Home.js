import supabase from '../config/supabaseClient';
import { useEffect, useState } from 'react';

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [announcements, setAnnouncements] = useState(null);
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', description: '' });

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const { data, error } = await supabase
        .from('announcements')  // Adjust table name
        .select();

      if (error) {
        setFetchError('Failed to retrieve announcements');
        setAnnouncements(null);
      } else if (data) {
        setFetchError(null);
        setAnnouncements(data);
      }
    };
    fetchAnnouncements();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewAnnouncement({ title: '', description: '' }); // Reset form
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement({ ...newAnnouncement, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description } = newAnnouncement;

    // Add new announcement to Supabase
    const { error } = await supabase
      .from('announcements')  // Adjust table name
      .insert([{ title, description }]);

    if (error) {
      alert('Failed to add announcement');
    } else {
      setAnnouncements([...announcements, { title, description }]);
      handleCloseModal();
    }
  };

  return (
    <div className="page home">
      <button onClick={handleOpenModal}>Adicionar aviso</button>
      <br/>
      <br/>
      <div className="list">
        {fetchError && <p>{fetchError}</p>}
        {announcements && (
          <div className="announcements-grid">
            {announcements
              .filter(announcement =>
                announcement.title.toLowerCase().includes(query)
              )
              .map((announcement) => (
                <AnnouncementCard key={announcement.id} announcement={announcement} />
              ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
        <div className="modal-content">
          <span className="close" onClick={handleCloseModal}>&times;</span>
          <h2>Criar novo aviso</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newAnnouncement.title}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={newAnnouncement.description}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Adicionar aviso</button>
          </form>
        </div>
      </div>
      
      )}
    </div>
  );
};

const AnnouncementCard = ({ announcement }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{announcement.title}</h2>
        {/* <span>{new Date(announcement.date).toLocaleDateString()}</span> */}
      </div>
      <div className="card-body">
        <p>{announcement.description}</p>
      </div>
      {/* <div className="card-footer">
        <button>More Info</button>
      </div> */}
    </div>
  );
};

export default Home;
