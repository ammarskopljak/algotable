import React, { useState, useEffect } from 'react';
import './UserInfo.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserRecommendations } from '../../../src/services/recommendationService';
import { getUser } from '../../../src/services/userService';
import {
  Container,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { User } from '@prisma/client';

function UserInfo() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(userId);
        setUser(userData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const recommendationData = await getUserRecommendations(userId);
        setRecommendations(
          recommendationData.length > 0 ? recommendationData : [],
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="user-container">
      <Grid item sx={{ width: '50%' }}>
        {user ? (
          <div>
            <Typography variant="h6" mb={2}>
              User Information
            </Typography>
            <Typography>
              <strong>First Name:</strong> {user.firstName}
            </Typography>
            <Typography>
              <strong>Last Name:</strong> {user.lastName}
            </Typography>
            <Typography>
              <strong>Age:</strong> {user.age}
            </Typography>
            <Typography>
              <strong>Gender:</strong> {user.gender}
            </Typography>
            <Typography>
              <strong>Interests:</strong> {user.interests.join(', ')}
            </Typography>
            <Typography>
              <strong>Item History:</strong> {user.itemHistory.join(', ')}
            </Typography>
          </div>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Grid>
      <Grid item sx={{ width: '50%' }}>
        <Typography variant="h6" mb={2}>
          Recommendations
        </Typography>
        {recommendations.length > 0 ? (
          <TableContainer
            component={Paper}
            sx={{ height: window.screen.availHeight - 300, overflow: 'auto' }}
          >
            <Table>
              <TableBody>
                {recommendations.map((recommendation, index) => (
                  <TableRow key={index}>
                    <TableCell>{recommendation}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>Loading...</Typography>
        )}
        <div
          style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end' }}
        >
          <button onClick={() => navigate('/')}>Back</button>
        </div>
      </Grid>
    </div>
  );
}

export default UserInfo;
