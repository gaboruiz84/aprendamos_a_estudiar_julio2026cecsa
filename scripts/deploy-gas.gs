/**
 * Google Apps Script — Cuadernillo Interactivo MINED 2026
 */

var SHEET_RESPUESTAS = "Respuestas";
var SHEET_CONFIG = "Config";
var SHEET_PROGRESO = "Progreso";

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_RESPUESTAS);
    if (!sheet) throw new Error('Sheet no encontrada');

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", "StudentID", "StudentName", "StudentNIE",
        "ItemID", "Phase", "QuestionID", "Type", "Value", "Correct", "Difficulty"
      ]);
    }

    var rows = [];
    for (var i = 0; i < data.answers.length; i++) {
      var a = data.answers[i];
      rows.push([
        new Date(data.timestamp).toISOString(),
        data.studentId,
        data.studentName,
        data.studentNie,
        a.itemId,
        a.phase,
        a.questionId,
        a.type,
        Array.isArray(a.value) ? a.value.join("; ") : a.value,
        a.correct === null ? "" : a.correct ? "Si" : "No",
        a.difficulty || ""
      ]);
    }

    if (rows.length > 0) {
      sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, id: data.studentId }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  try {
    if (e.parameter.type === "config") {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_CONFIG);
      if (!sheet) throw new Error('Sheet Config no encontrada');
      var rows = sheet.getDataRange().getValues();
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, config: rows }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    if (e.parameter.type === "answers") {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_RESPUESTAS);
      if (!sheet) throw new Error('Sheet Respuestas no encontrada');
      var data = sheet.getDataRange().getValues();
      if (data.length === 0) {
        return ContentService
          .createTextOutput(JSON.stringify({ success: true, answers: [], columns: [] }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      var columns = data[0];
      var rows = [];
      for (var i = 1; i < data.length; i++) {
        var obj = {};
        for (var j = 0; j < columns.length; j++) {
          obj[columns[j]] = data[i][j];
        }
        rows.push(obj);
      }
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, answers: rows, columns: columns }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: "GAS endpoint active" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function testSetup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ["Respuestas","Config","Progreso"].forEach(function(n) {
    if (!ss.getSheetByName(n)) ss.insertSheet(n);
  });
  var resp = ss.getSheetByName("Respuestas");
  resp.clear();
  resp.appendRow([
    "Timestamp","StudentID","StudentName","StudentNIE",
    "ItemID","Phase","QuestionID","Type","Value","Correct","Difficulty"
  ]);
  var cfg = ss.getSheetByName("Config");
  cfg.clear();
  cfg.appendRow(["ItemID","Field","Type","Options"]);
  var prog = ss.getSheetByName("Progreso");
  prog.clear();
  prog.appendRow(["StudentID","ItemID","Phase","Status","LastUpdated"]);
}
