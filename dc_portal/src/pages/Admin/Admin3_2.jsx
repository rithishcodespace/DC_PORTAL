import React, { useState, useEffect } from 'react';
import S_Card1 from '../../components/Admin_Cards/S_Card1'; 
import S_Card2 from '../../components/Admin_Cards/S_Card2';
import S_Card3 from '../../components/Admin_Cards/S_Card3';
import NoSchedulesImage from '../../assets/No Schedules.png';

export default function Admin3_2() {
  const [heading, setHeading] = useState('');
  const fullHeading = '  My Meetings:';
  const headingLength = fullHeading.length;
  const [complaints, setComplaints] = useState([]);
  const [todaysMeetings, setTodaysMeetings] = useState([]); 

  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < headingLength - 1) {
        setHeading((prev) => prev + fullHeading[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);



  // Fetching all complaints from the backend
  useEffect(() => {
  const fetchComplaints = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/meeting-details");
      const data = await response.json();

      console.log("Fetched Data:", data); 

      // Sorting complaints by date
      const sortedData = data.sort((a, b) => new Date(parseDate(b.date)) - new Date(parseDate(a.date)));
      setComplaints(sortedData);

      // Filtering today's meetings
      const today = new Date().toISOString().split('T')[0]; 
      console.log("Today's Date:", today);

      const todaysMeetings = sortedData.filter((meeting) => {
        if (!meeting.date) {
          console.warn("Skipping record with missing date:", meeting); 
          return false;
        }

        try {
          const meetingDate = parseDate(meeting.date); 
          console.log("Meeting Date (Normalized):", meetingDate); 
          console.log("Meeting Date (Original):", meeting.date); 
          return meetingDate === today;
        } catch (error) {
          console.error("Invalid date format for meeting:", meeting); 
          return false;
        }
      });

      console.log("Today's Meetings:", todaysMeetings); 
      setTodaysMeetings(todaysMeetings);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('-'); 
    return `${year}-${month}-${day}`; 
  };

  fetchComplaints();
}, []);

  return (
    <div>
     
      <div style={{ padding: '5px', marginTop: '100px', marginBottom: '0px', marginLeft: '145px' }}>
        <p style={{ fontFamily: 'tahoma', fontSize: '30px', color: '#5A6387' }}>{heading}</p>
      </div>

           
      <div
        style={{
          padding: '20px',
          marginLeft: '130px',
          width: 'calc(100% - 170px)',
          boxSizing: 'border-box',
          marginBottom: '40px',
          
        }}
      >
        <h3 style={{ fontFamily: 'tahoma', fontSize: '24px', color: '#28A745', marginBottom: '20px', fontWeight: 500 }}>
          Today's Schedule :
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '50px',
          }}
        >
          {todaysMeetings.length > 0 ? (
            todaysMeetings.map((meeting) => (
              <S_Card1 key={meeting.id} complaint={meeting} /> 
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
              <img src={NoSchedulesImage} alt="No Schedules" style={{ maxWidth: '300px', margin: '0 auto' }} />
              <p style={{ fontFamily: 'tahoma', fontSize: '18px', color: '#5A6387' }}>No meetings scheduled for today.</p>
            </div>
          )}
        </div>
      </div>

     
      <hr
        style={{
          border: 'none',
          borderTop: '5px solid #000000', 
          margin: '20px 130px', 
          width: 'calc(100% - 170px)', 
          marginBottom: "30px"
        }}
      />

      {/* All Meetings */}
      <div
        className="scroll-content"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '50px',                          
          padding: '20px',
          marginLeft: '130px',
          width: 'calc(100% - 170px)',
          boxSizing: 'border-box',
          marginBottom: "35px"
        }}
      >
       
        <S_Card2 />
        <S_Card3 />

       
       {/* All Complaints */}
      {complaints
        .filter((complaint) => !todaysMeetings.some((meeting) => meeting.id === complaint.id))
        .map((complaint) => (
      <S_Card1 key={complaint.id} complaint={complaint} />
  ))}
      </div>
    </div>
  );
}