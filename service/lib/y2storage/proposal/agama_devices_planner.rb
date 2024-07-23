# Copyright (c) [2024] SUSE LLC
#
# All Rights Reserved.
#
# This program is free software; you can redistribute it and/or modify it
# under the terms of version 2 of the GNU General Public License as published
# by the Free Software Foundation.
#
# This program is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
# FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
# more details.
#
# You should have received a copy of the GNU General Public License along
# with this program; if not, contact SUSE LLC.
#
# To contact SUSE LLC about this file by physical or electronic mail, you may
# find current contact information at www.suse.com.

require "y2storage/storage_manager"
require "y2storage/planned"
require "y2storage/disk_size"
require "y2storage/proposal/planned_processor"
require "y2storage/proposal/agama_drive_planner"

module Y2Storage
  module Proposal
    class AgamaDevicesPlanner
      include Yast::Logger

      # Settings used to calculate the planned devices.
      #
      # @return [Agama::Storage::Profile]
      attr_reader :settings

      # @param settings [Agama::Storage::Profile]
      # @param issues_list [Array<Agama::Issue>]
      def initialize(settings, issues_list)
        @settings = settings
        @issues_list = issues_list
      end

      # List of devices that need to be created to satisfy the settings. Does not include
      # devices needed for booting.
      #
      # For the time being, this implements only stuff coming from partitition elements within
      # drive elements.
      #
      # In the future this will also include planned devices that are a direct translations of
      # those typically generated by the Guided Proposal. For those, note that:
      #  - For dedicated VGs it creates a Planned VG containing a Planned LV, but no PVs
      #  - For LVM volumes it create a Planned LV but associated to no planned VG
      #  - For partition volumes, it creates a planned partition, of course
      #
      # @param target [Symbol] see #planned_devices
      # @param devicegraph [Devicegraph]
      # @return [Array<Planned::Device>]
      def initial_planned_devices(devicegraph)
        settings.drives.flat_map { |d| planned_for_drive(d, devicegraph) }.compact
      end

      # Modifies the given list of planned devices, adding any planned partition needed for booting
      # the new target system
      #
      # @param devices [Array<Planned::Device>]
      # @param target [Symbol] see #planned_devices
      # @param devicegraph [Devicegraph]
      # @return [Array<Planned::Device>]
      def add_boot_devices(devices, devicegraph)
        return unless settings.boot.configure?

        boot = PlannedProcessor.new(devices).boot_devices(:min, devicegraph, settings.boot_device)
        devices.unshift(*boot)
      end

      protected

      # @return [Array<Agama::Issue>] List to register any found issue
      attr_reader :issues_list

      # I'm leaving out intentionally support for StrayBlkDevice. As far as I know,
      # the plan for SLE/Leap 16 is to drop XEN support
      def planned_for_drive(drive, devicegraph)
        planner = AgamaDrivePlanner.new(devicegraph, issues_list)
        planner.planned_devices(drive)
      end
    end
  end
end