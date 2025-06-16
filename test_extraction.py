import unittest
import os
import shutil
from app import app, extract_text_from_pdf, extract_images_from_pdf
from reportlab.pdfgen import canvas
from io import BytesIO

class TestPDFExtraction(unittest.TestCase):    
    def setUp(self):
        # Setup test client
        self.app = app.test_client()
        self.app.testing = True
        
        # Buat folder test
        self.test_dir = os.path.join(os.path.dirname(__file__), 'test_files')
        self.image_dir = os.path.join(self.test_dir, 'images')
        os.makedirs(self.test_dir, exist_ok=True)
        os.makedirs(self.image_dir, exist_ok=True)
        
        # Path file test PDF
        self.sample_pdf = os.path.join(self.test_dir, 'sample.pdf')
        
        # Buat file PDF test
        self._create_sample_pdf()
    
    def _create_sample_pdf(self):
        """Membuat file PDF sederhana untuk testing"""
        # Buat PDF dengan reportlab
        packet = BytesIO()
        c = canvas.Canvas(packet, pagesize=(200, 200))
        
        # Tambahkan teks
        c.drawString(10, 100, "Ini adalah teks test untuk PDF")
        
        # Simpan ke file
        c.save()
        with open(self.sample_pdf, 'wb') as f:
            f.write(packet.getvalue())
    
    def tearDown(self):
        # Hapus file test setelah selesai
        if os.path.exists(self.test_dir):
            shutil.rmtree(self.test_dir)
    
    def test_extract_text_from_pdf(self):
        """Test ekstraksi teks dari PDF"""
        result = extract_text_from_pdf(self.sample_pdf)
        self.assertIsInstance(result, str)
        self.assertIn("Ini adalah teks test", result)
        print(f"Teks yang diekstrak: {result}")
    
    def test_extract_images_from_pdf(self):
        """Test ekstraksi gambar dari PDF"""
        result = extract_images_from_pdf(
            self.sample_pdf, 
            self.image_dir,
            'test_pdf'
        )
        self.assertIsInstance(result, list)
        print(f"Jumlah gambar yang diekstrak: {len(result)}")
        print(f"Path gambar: {result}")

if __name__ == '__main__':
    unittest.main()
