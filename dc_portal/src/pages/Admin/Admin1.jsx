import React from 'react';
import Welcome_Card from '../../components/Admin_Cards/Welcome_card';
import { Sparkles } from 'lucide-react';

export default function Admin1() {
  return (
    <div style={{ marginBottom: '150px', backgroundColor: '#FFFFFF' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          height: '150px',
          marginTop: '60px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '550px' }}>
          <p
            style={{
              fontFamily: 'Tahoma',
              fontSize: '2.2rem',
              margin: 0,
              fontWeight: 500,
              color: '#444B5D',
              marginRight: '10px',
            }}
          >
            Welcome Admin
          </p>
          <Sparkles size={32} color="#fbbf24" />
        </div>
      </div>

      <div style={{ marginTop: '80px', marginLeft: '550px' }}>
        <Welcome_Card />
      </div>
    </div>
  );
}
