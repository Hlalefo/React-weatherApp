import React from 'react';

const Greeting = ({ data }) => {
  const currentHour = new Date(data.dt * 1000).getHours();
  let greeting = '';

  if (currentHour < 12) {
    greeting = 'Good Morning';
  } else if (currentHour < 18) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

  return <h2>{greeting}</h2>;
};

export default Greeting;
