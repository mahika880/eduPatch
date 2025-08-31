package com.example.EduPatch.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class QRCodeService {

    @Value("${app.base-url:http://localhost:8080}")
    private String baseUrl;

    /**
     * Generates a QR code for a specific page ID
     * @param pageId The ID of the page
     * @return Byte array containing the QR code image
     */
    public byte[] generateQRCode(String pageId) {
        String qrCodeContent = baseUrl + "/pages/" + pageId;
        return generateQRCodeFromText(qrCodeContent);
    }

    /**
     * Generates a QR code from the given text content
     * @param text The text to encode in the QR code
     * @return Byte array containing the QR code image
     */
    public byte[] generateQRCodeFromText(String text) {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        
        try {
            BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, 250, 250);
            MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream);
            return outputStream.toByteArray();
        } catch (WriterException | IOException e) {
            throw new RuntimeException("Failed to generate QR code", e);
        }
    }
}