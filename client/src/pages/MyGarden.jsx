import React, { useState } from 'react';
import useAuthService from '../utils/authHook';
import { Box, Grid, IconButton, Popover, Stack, Typography } from '@mui/material';
import { ResponsiveImageContainer } from '../components/ResponsiveImageContainer';
import PlantDetails from './PlantDetails';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_PLANTS } from '../utils/queries';
import { NavLink } from 'react-router-dom';
import CenteredCircularProgress from '../components/CenteredCircularProgress';
import { DeleteOutlineRounded, DeleteRounded } from '@mui/icons-material';
import { DELETE_PLANT } from '../utils/mutations';

const fakePlants = Array(5)
	.fill(null)
	.map(() => ({
		name: 'plant',
		_id: crypto.getRandomValues(new Uint32Array(1))[0],
		image: 'https://via.placeholder.com/150/flower',
	}));

/**
 *
 * @param {*} props
 * @returns
 */
function MyGarden(props) {
	const auth = useAuthService();
	const { data, error, loading } = useQuery(QUERY_PLANTS);
	const [deleteMutation] = useMutation(DELETE_PLANT, {
		refetchQueries: [{ query: QUERY_PLANTS }],
		onError: (e) => {
			/* TO DO: add error handling */
			console.error(e.message);
			alert('Error deleting plant: ' + e.message);
		},
	});

	if (loading) {
		return <CenteredCircularProgress />;
	}

	const restOfPlants = data?.plants;

	const deletePlant = (plant, e) => {
		e.preventDefault();
		console.log('delete plant', plant);
		deleteMutation({ variables: { id: plant._id } }).then();
	};

	return (
		<Stack className='MyGarden' sx={{ direction: 'row', placeItems: 'center' }}>
			<Stack sx={{ p: 5, width: 'clamp(300px,60%,700px)' }}>
				<Box className='myGardenHeader'>
					<p>Hello</p>
					<Typography variant='h1'>{auth.user.username}</Typography>
				</Box>

				{/* plants list in a 2/2 grid */}
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						gridTemplateRows: '200px',
						gap: 2,
					}}
				>
					{/* first plant takes 2 columns and 2 rows*/}

					{/* rest of the plants take 1 column and 1 row */}
					{restOfPlants.map((plant, index) => (
						<Box sx={{ position: 'relative', ...(!index ? { gridColumn: '1 / 3', gridRow: '1 / 3', maxHeight: '400px' } : {}) }}>
							<NavLink to={`/plants/${plant._id}`} key={plant._id}>
								<ResponsiveImageContainer key={plant._id} image={plant.img} />
								<FloatViewDetails />
								<IconButton sx={{ position: 'absolute', right: 2, top: 2, color: 'white', backgroundColor: 'grey' }} onClick={(e) => deletePlant(plant, e)}>
									<DeleteRounded />
								</IconButton>
							</NavLink>
						</Box>
					))}
				</Box>
			</Stack>
		</Stack>
	);
}

export default MyGarden;

function FloatViewDetails() {
	return (
		<Box sx={{ display: 'grid', placeContent: 'center', position: 'absolute', inset: '0', height: '100%', width: '100%', color: 'white' }}>
			<Typography variant='h2'>View Details</Typography>
		</Box>
	);
}
