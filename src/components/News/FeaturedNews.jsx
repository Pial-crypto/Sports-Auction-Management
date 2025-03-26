import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { motion } from 'framer-motion';
import { featuredNews } from '@/constants/News/newsData';

const FeaturedNews = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Featured Stories
      </Typography>
      {featuredNews.map((news, index) => (
        <motion.div
          key={news.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <Card
            component={motion.div}
            whileHover={{ y: -5 }}
            sx={{ mb: 2 }}
          >
            <CardMedia
              component="img"
              height="140"
              image={news.image}
              alt={news.title}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {news.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {news.description}
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </Box>
  );
};

export default FeaturedNews; 