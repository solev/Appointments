using AppointmentApp.Settings;
using AppointmentApp.Slots;
using AppointmentApp.Slots.Dto;
using AppointmentApp.Web.Models.Adviser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace AppointmentApp.Web.Controllers
{
    public class AdviserController : Controller
    {
        private readonly ISlotAppService _slotService;
        private readonly IApplicationSettingsAppService _settingService;

        public AdviserController(ISlotAppService slotService, ApplicationSettingsAppService settingService)
        {
            _slotService = slotService;
            _settingService = settingService;
        }

        // GET: Adviser
        [HttpPost]
        public async Task<ActionResult> GetAppointmentSlots(GetSlotsInput model)
        {
            GetAppointmentSlotsViewModel vm = new GetAppointmentSlotsViewModel();
            Dictionary<DateTime, SlotDto> slotDict = new Dictionary<DateTime, SlotDto>();
            model.AdviserIds = new List<int>() { model.AdviserId.Value };
            var slots = await _slotService.GetAll(model);
            List<SlotDto> slotList = slots.Items.ToList();
            List<DateTime> dates = new List<DateTime>();

            var times = generateTimes();
            DateTime dateToAdd = model.StartDate.Value;
            dates.Add(dateToAdd);

            while (true)
            {
                dateToAdd = dateToAdd.AddDays(1);
                dates.Add(dateToAdd);
                if(dateToAdd.Date == model.EndDate.Value.Date)
                {
                    break;
                }
            }

            foreach(var slot in slotList)
            {
                slotDict.Add(slot.Date, slot);
            }
            
            var allSettings = _settingService.GetAllSettings();
            foreach(var item in allSettings)
            {
                if(item.Name == SettingNames.AvailableColor)
                {
                    vm.AvailableColor = item.Value;
                }
                else if (item.Name == SettingNames.WithheldColor)
                {
                    vm.WithheldColor = item.Value;
                }
                else if (item.Name == SettingNames.BookedColor)
                {
                    vm.BookedColor = item.Value;
                }
                else if (item.Name == SettingNames.NotAvailableColor)
                {
                    vm.NotAvailableColor = item.Value;
                }
            }

            vm.AdviserId = model.AdviserId.Value;
            vm.Dates = dates;
            vm.Times = times;
            vm.Slots = slotDict;
            
            return View(vm);
        }        

        List<string> generateTimes()
        {
            List<string> result = new List<string>();
            TimeSpan ts = new TimeSpan(9, 0, 0);

            while (true)
            {
                if (ts.Hours == 23 && ts.Minutes == 50)
                {
                    result.Add(string.Format("{0}:{1}", ts.Hours.ToString("00"), ts.Minutes.ToString("00")));
                    break;
                }                    

                result.Add(string.Format("{0}:{1}", ts.Hours.ToString("00"), ts.Minutes.ToString("00")));
                ts += new TimeSpan(0,10,0);                
            }

            return result;
        }
    }
}