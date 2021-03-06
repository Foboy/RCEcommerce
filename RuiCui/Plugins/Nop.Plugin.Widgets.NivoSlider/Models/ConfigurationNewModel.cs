﻿using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using Nop.Web.Framework;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.NivoSlider.Models
{
    public class ConfigurationNewModel : BaseNopModel
    {
        public int ActiveStoreScopeConfiguration { get; set; }


        [NopResourceDisplayName("Plugins.Widgets.NivoSlider.Picture")]
        [UIHint("SinglePicture")]
        public int Picture1Id { get; set; }
        public bool Picture1Id_OverrideForStore { get; set; }
        [NopResourceDisplayName("Plugins.Widgets.NivoSlider.Text")]
        [AllowHtml]
        public string Text1 { get; set; }
        public bool Text1_OverrideForStore { get; set; }
        [NopResourceDisplayName("Plugins.Widgets.NivoSlider.Link")]
        [AllowHtml]
        public string Link1 { get; set; }
        public bool Link1_OverrideForStore { get; set; }

        [NopResourceDisplayName("Plugins.Widgets.NivoSlider.Picture")]
        [UIHint("SinglePicture")]
        public int Picture2Id { get; set; }
        public bool Picture2Id_OverrideForStore { get; set; }
        [NopResourceDisplayName("Plugins.Widgets.NivoSlider.Text")]
        [AllowHtml]
        public string Text2 { get; set; }
        public bool Text2_OverrideForStore { get; set; }
        [NopResourceDisplayName("Plugins.Widgets.NivoSlider.Link")]
        [AllowHtml]
        public string Link2 { get; set; }
        public bool Link2_OverrideForStore { get; set; }

        [NopResourceDisplayName("Plugins.Widgets.NivoSlider.Picture")]
        [UIHint("SinglePicture")]
        public int Picture3Id { get; set; }
        public bool Picture3Id_OverrideForStore { get; set; }
        [NopResourceDisplayName("Plugins.Widgets.NivoSlider.Text")]
        [AllowHtml]
        public string Text3 { get; set; }
        public bool Text3_OverrideForStore { get; set; }
        [NopResourceDisplayName("Plugins.Widgets.NivoSlider.Link")]
        [AllowHtml]
        public string Link3 { get; set; }
        public bool Link3_OverrideForStore { get; set; }

        [NopResourceDisplayName("Plugins.Widgets.NivoSlider.Picture")]
        [UIHint("SinglePicture")]
        public int Picture4Id { get; set; }
        public bool Picture4Id_OverrideForStore { get; set; }
        [NopResourceDisplayName("Plugins.Widgets.NivoSlider.Text")]
        [AllowHtml]
        public string Text4 { get; set; }
        public bool Text4_OverrideForStore { get; set; }
        [NopResourceDisplayName("Plugins.Widgets.NivoSlider.Link")]
        [AllowHtml]
        public string Link4 { get; set; }
        public bool Link4_OverrideForStore { get; set; }

        [NopResourceDisplayName("Plugins.Widgets.NivoSlider.Picture")]
        [UIHint("SinglePicture")]
        public int Picture5Id { get; set; }
        public bool Picture5Id_OverrideForStore { get; set; }
        [NopResourceDisplayName("Plugins.Widgets.NivoSlider.Text")]
        [AllowHtml]
        public string Text5 { get; set; }
        public bool Text5_OverrideForStore { get; set; }
        [NopResourceDisplayName("Plugins.Widgets.NivoSlider.Link")]
        [AllowHtml]
        public string Link5 { get; set; }
        public bool Link5_OverrideForStore { get; set; }

        //6
        [NopResourceDisplayName("Plugins.Widgets.NivoSlider.Picture")]
        [UIHint("SinglePicture")]
        public int Picture6Id { get; set; }
        public bool Picture6Id_OverrideForStore { get; set; }
        [NopResourceDisplayName("Plugins.Widgets.NivoSlider.Text")]
        [AllowHtml]
        public string Text6 { get; set; }
        public bool Text6_OverrideForStore { get; set; }
        [NopResourceDisplayName("Plugins.Widgets.NivoSlider.Link")]
        [AllowHtml]
        public string Link6 { get; set; }
        public bool Link6_OverrideForStore { get; set; }
        //7
        [NopResourceDisplayName("Plugins.Widgets.NivoSlider.Picture")]
        [UIHint("SinglePicture")]
        public int Picture7Id { get; set; }
        public bool Picture7Id_OverrideForStore { get; set; }
        [NopResourceDisplayName("Plugins.Widgets.NivoSlider.Text")]
        [AllowHtml]
        public string Text7 { get; set; }
        public bool Text7_OverrideForStore { get; set; }
        [NopResourceDisplayName("Plugins.Widgets.NivoSlider.Link")]
        [AllowHtml]
        public string Link7 { get; set; }
        public bool Link7_OverrideForStore { get; set; }
        //8
        [NopResourceDisplayName("Plugins.Widgets.NivoSlider.Picture")]
        [UIHint("SinglePicture")]
        public int Picture8Id { get; set; }
        public bool Picture8Id_OverrideForStore { get; set; }
        [NopResourceDisplayName("Plugins.Widgets.NivoSlider.Text")]
        [AllowHtml]
        public string Text8 { get; set; }
        public bool Text8_OverrideForStore { get; set; }
        [NopResourceDisplayName("Plugins.Widgets.NivoSlider.Link")]
        [AllowHtml]
        public string Link8 { get; set; }
        public bool Link8_OverrideForStore { get; set; }
    }
}