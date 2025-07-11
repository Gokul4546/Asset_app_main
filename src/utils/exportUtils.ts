import { Asset } from '../types/Asset';

export const exportToCSV = (assets: Asset[], filename: string = 'assets.csv') => {
  const headers = [
    'Asset ID',
    'Name',
    'Type',
    'Status',
    'Assigned User',
    'Location',
    'Last Verified',
    'Category',
    'Audit Status'
  ];

  const csvContent = [
    headers.join(','),
    ...assets.map(asset => [
      asset.id,
      `"${asset.name}"`,
      asset.type,
      asset.status,
      `"${asset.assignedUser.name}"`,
      `"${asset.location}"`,
      asset.lastVerified.toISOString().split('T')[0],
      asset.category,
      asset.auditStatus
    ].join(','))
  ].join('\n');

  downloadFile(csvContent, filename, 'text/csv');
};

export const exportToJSON = (assets: Asset[], filename: string = 'assets.json') => {
  const jsonContent = JSON.stringify(assets, null, 2);
  downloadFile(jsonContent, filename, 'application/json');
};

export const exportToExcel = (assets: Asset[], filename: string = 'assets.xlsx') => {
  // For a real implementation, you'd use a library like xlsx
  // For now, we'll export as CSV with .xlsx extension
  exportToCSV(assets, filename);
};

export const exportToPDF = (assets: Asset[], filename: string = 'assets.pdf') => {
  // For a real implementation, you'd use a library like jsPDF
  // For now, we'll create a simple HTML table and print it
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Asset Registry Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; font-weight: bold; }
        .header { text-align: center; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Asset Registry Report</h1>
        <p>Generated on ${new Date().toLocaleDateString()}</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Asset ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Assigned User</th>
            <th>Location</th>
            <th>Last Verified</th>
          </tr>
        </thead>
        <tbody>
          ${assets.map(asset => `
            <tr>
              <td>${asset.id}</td>
              <td>${asset.name}</td>
              <td>${asset.type}</td>
              <td>${asset.status}</td>
              <td>${asset.assignedUser.name}</td>
              <td>${asset.location}</td>
              <td>${asset.lastVerified.toLocaleDateString()}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
  }
};

const downloadFile = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};