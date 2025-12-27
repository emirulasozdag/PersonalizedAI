<?php

declare(strict_types=1);

namespace App\Core;

/**
 * Minimal PDF generator for plain text (no external deps).
 * Generates a single-page PDF with the given lines.
 */
final class SimplePdf
{
    /** @param list<string> $lines */
    public static function fromTextLines(array $lines): string
    {
        $text = '';
        foreach ($lines as $line) {
            $line = str_replace(["\r", "\n"], ' ', $line);
            $line = self::escapePdfText($line);
            $text .= "({$line}) Tj\n0 -14 Td\n";
        }

        $contentStream = "BT\n/F1 12 Tf\n72 760 Td\n" . $text . "ET\n";
        $contentLen = strlen($contentStream);

        $objects = [];
        $objects[] = "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n";
        $objects[] = "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n";
        $objects[] = "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n";
        $objects[] = "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n";
        $objects[] = "5 0 obj\n<< /Length {$contentLen} >>\nstream\n{$contentStream}\nendstream\nendobj\n";

        $pdf = "%PDF-1.4\n";
        $offsets = [0];
        foreach ($objects as $obj) {
            $offsets[] = strlen($pdf);
            $pdf .= $obj;
        }

        $xrefPos = strlen($pdf);
        $count = count($objects) + 1;
        $pdf .= "xref\n0 {$count}\n";
        $pdf .= "0000000000 65535 f \n";
        for ($i = 1; $i < $count; $i++) {
            $pdf .= sprintf("%010d 00000 n \n", $offsets[$i]);
        }

        $pdf .= "trailer\n<< /Size {$count} /Root 1 0 R >>\n";
        $pdf .= "startxref\n{$xrefPos}\n%%EOF";

        return $pdf;
    }

    private static function escapePdfText(string $text): string
    {
        return str_replace(['\\', '(', ')'], ['\\\\', '\\(', '\\)'], $text);
    }
}

__halt_compiler();


























































}    }        return str_replace(['\\', '(', ')'], ['\\\\', '\\(', '\\)'], $text);    {    private static function escapePdfText(string $text): string    }        return $pdf;        $pdf .= "startxref\n$xrefPos\n%%EOF";        $pdf .= "trailer\n<< /Size " . (count($objects) + 1) . " /Root 1 0 R >>\n";        }            $pdf .= sprintf("%010d 00000 n \n", $offsets[$i]);        for ($i = 1; $i <= count($objects); $i++) {        $pdf .= "0000000000 65535 f \n";        $pdf .= "xref\n0 " . (count($objects) + 1) . "\n";        $xrefPos = strlen($pdf);        }            $pdf .= $obj;            $offsets[] = strlen($pdf);        foreach ($objects as $obj) {        $offsets = [0];        $pdf = "%PDF-1.4\n";        $objects[] = "5 0 obj\n<< /Length $contentLen >>\nstream\n$contentStream\nendstream\nendobj\n";        $objects[] = "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n";        $objects[] = "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n";        $objects[] = "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n";        $objects[] = "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n";        $objects = [];        // Objects        $contentLen = strlen($contentStream);        $contentStream = "BT\n/F1 12 Tf\n72 760 Td\n" . $text . "ET\n";        }            $text .= "($line) Tj\n0 -14 Td\n";            $line = self::escapePdfText($line);            $line = str_replace(["\\r", "\\n"], ' ', $line);        foreach ($lines as $line) {        $text = "";    {    public static function fromTextLines(array $lines): string    /** @param list<string> $lines */{final class SimplePdf */ * Generates a single-page PDF with the given lines. * Minimal PDF generator for plain text (no external deps)./**namespace App\Core;declare(strict_types=1);
declare(strict_types=1);

namespace App\Core;

/**
 * Minimal PDF generator for plain text export.
 * Produces a valid single-page PDF with basic Helvetica text.
 */
final class SimplePdf
{
    /** @param list<string> $lines */
    public static function fromTextLines(array $lines): string
    {
        $text = '';
        foreach ($lines as $line) {
            $escaped = str_replace(['\\', '(', ')'], ['\\\\', '\\(', '\\)'], $line);
            $text .= '(' . $escaped . ") Tj\n0 -14 Td\n";
        }

        $contentStream = "BT\n/F1 12 Tf\n72 760 Td\n" . $text . "ET\n";
        $contentLen = strlen($contentStream);

        $objects = [];
        $objects[] = "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n";
        $objects[] = "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n";
        $objects[] = "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n";
        $objects[] = "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n";
        $objects[] = "5 0 obj\n<< /Length {$contentLen} >>\nstream\n{$contentStream}endstream\nendobj\n";

        $pdf = "%PDF-1.4\n";
        $offsets = [0];
        foreach ($objects as $obj) {
            $offsets[] = strlen($pdf);
            $pdf .= $obj;
        }

        $xrefStart = strlen($pdf);
        $count = count($objects) + 1;
        $pdf .= "xref\n0 {$count}\n";
        $pdf .= sprintf("%010d 65535 f \n", 0);
        for ($i = 1; $i < $count; $i++) {
            $pdf .= sprintf("%010d 00000 n \n", $offsets[$i]);
        }

        $pdf .= "trailer\n<< /Size {$count} /Root 1 0 R >>\nstartxref\n{$xrefStart}\n%%EOF";
        return $pdf;
    }
}
