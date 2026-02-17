using Microsoft.Web.WebView2.Core;
using System;
using System.IO;
using System.Windows.Forms;

namespace Status_Simulation
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            this.Load += Form1_Load;
        }

        private async void Form1_Load(object sender, EventArgs e)
        {
            // Initialize the WebView2 environment
            await webView.EnsureCoreWebView2Async(null);

            // Map the physical 'MODSIM' folder to a virtual 'https://app.assets' URL
            string projectDirectory = AppDomain.CurrentDomain.BaseDirectory;
            string modsimPath = Path.Combine(projectDirectory, "MODSIM");

            webView.CoreWebView2.SetVirtualHostNameToFolderMapping(
                "app.assets", modsimPath, CoreWebView2HostResourceAccessKind.Allow);

            // Navigate to the local index file
            webView.Source = new Uri("https://app.assets/index.html");
        }
    }
}