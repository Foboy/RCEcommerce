﻿
using Nop.Core.Configuration;

namespace Nop.Plugin.Widgets.NivoSlider
{
    public class NivoIndexSliderRootSettings : ISettings
    {
        public int Picture1Id { get; set; }
        public string Text1 { get; set; }
        public string Link1 { get; set; }

        public int Picture2Id { get; set; }
        public string Text2 { get; set; }
        public string Link2 { get; set; }

        public int Picture3Id { get; set; }
        public string Text3 { get; set; }
        public string Link3 { get; set; }


    }
}