import { Container, Title, Text, Button, Card, Center, Divider } from "@mantine/core";
import { LinkOutlined } from "@ant-design/icons";
import "/src/gallery.css"; // Import del file CSS
import { motion } from "framer-motion";

const driveFolderLink = "https://drive.google.com/drive/folders/1F4xudRaM626AhCEacPAccGzUittKQOXy";

const Gallery = () => {
  return (
    <div className="drive-container">
       <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
      <Container size="xl">
        <Card shadow="md" radius="xl" p="xl" className="drive-card">
          <Title order={2} className="drive-title">PHOTOGALLERY</Title>
          <Text size="lg" mt="md" className="drive-text">
            Accedi rapidamente alla cartella Google Drive condivisa.
          </Text>
          <Center mt="xl">
            <Button
              component="a"
              href={driveFolderLink}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              radius="xl"
              leftSection={<LinkOutlined />}
              className="drive-button"
            >
              Apri Cartella
            </Button>
          </Center>
          <hr className="custom-divider" />

          <Text size="lg" mt="md" className="drive-subtext">
            All'interno troverai tutte le foto delle gare e degli eventi!
          </Text>
        </Card>
      </Container>
      </motion.div>
    </div>
  );
};

export default Gallery;
