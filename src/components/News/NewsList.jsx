import React from 'react';
import { Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';
import { motion } from 'framer-motion';
import { newsItems } from '@/constants/News/newsData';

const NewsList = () => {
  return (
    <Grid container spacing={3}>
      {newsItems.map((news, index) => (
        <Grid item xs={12} key={news.id}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card
              component={motion.div}
              whileHover={{ y: -5 }}
              sx={{ display: 'flex', height: '100%' }}
            >
              <CardMedia
                component="img"
                sx={{ width: 200 }}
                image={news.image}
                alt={news.title}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {news.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {news.date}
                </Typography>
                <Typography variant="body1">
                  {news.description}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default NewsList; 