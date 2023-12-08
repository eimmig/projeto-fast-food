import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Cards from '../Cards/Cards';
import Header from '../Header/Header';
import AuthService from './../../../services/Auth/AuthService';
import { useNavigate } from 'react-router-dom';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 16px;
  margin: 20px;
`;

const Company = () => {
  const [originalCompanies, setOriginalCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/getCompanies');
        const companies = response.data.companies;
        setOriginalCompanies(companies);
        setFilteredCompanies(companies);
      } catch (error) {
        console.error('Erro ao obter as empresas:', error.message);
      }
    };

    fetchCompanies();
  }, []);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filtered = originalCompanies.filter((company) =>
      company.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCompanies(filtered);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    AuthService.logout();
    window.location.reload();
  };

  const handleCardClick = (companyId) => {
    localStorage.setItem('companyId', companyId);
    navigate(`/${companyId}`);
  }

  return (
    <>
      <Header onSearch={handleSearch} onLogout={handleLogout} />
      <GridContainer>
        {filteredCompanies.map((company) => (
          <div key={company.id} className="card" onClick={() => handleCardClick(company.id)}>
            <Cards company={company} />
          </div>
        ))}
      </GridContainer>
    </>
  );
};

export default Company;
